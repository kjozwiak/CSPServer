'use strict'

const Hapi = require('hapi')
const Blankie = require('blankie')
const Scooter = require('scooter')
const server = new Hapi.Server()

server.connection({port: 22935})

server.route({
  method: 'GET',
  path: '/user-agent',
  handler: function (request, reply) {
    return reply(request.plugins.scooter.toJSON())
  }
})

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply.file('index.html')
  }
})

server.register(require('inert'), (err) => {
  if (err) {
    throw err
  }
  // CSP disabled
  server.route({
    method: 'GET',
    path: '/cspDisabled',
    config: {
      handler: function (request, reply) {
        reply.file('cspDisabled.html')
      },
      plugins: {
        blankie: false
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/cspEnabled',
    handler: function (request, reply) {
      reply.file('cspEnabled.html')
    }
  })

    // another example of using blankie to set CSP directives per directory
  server.route({
    method: 'GET',
    path: '/csptests/{param*}',
    config: {
      handler: {
        directory: {
          path: 'csptests'
        }
      },
      plugins: {
        blankie: {
          defaultSrc: 'self',
          scriptSrc: ['self', 'unsafe-inline'],
          reportOnly: true,
          reportUri: 'https://report-uri.io/report/kamiljoz/reportOnly'
        }
      }
    }
  })
})

server.register([Scooter, {
  register: Blankie,
  options: {
    // examples of CSP directives that affect the entire server
    // objectSrc: ['unsafe-inline', 'unsafe-eval']
  }
}], function (err) {
  if (err) {
    throw err
  }

  server.start(() => {
    console.log('Server running at:', server.info.uri)
  })
})
