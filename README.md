# CSPServer
CSP Server /w Node + Hapi + Scooter + Blankie

Created this basic CSP Server that I use for QAing CSP issues in Firefox..

## Setup

- Pull code via `git clone https://github.com/kjozwiak/CSPServer.git`
- Install dependencies via `npm install` (Optional: set `npm set progress=false` for improved npm install speed)

## Configuration

- CSP directives that are available under blankie can found [HERE](https://github.com/nlf/blankie#options).
- I didn't add my own CSP report parser, used https://report-uri.io instead... make sure you change the `reportUri` directive to point to either your own parser or your own account under https://report-uri.io (accounts are free!)

## Running

- In the command terminal, run `node server.js` inside the CSPServer directory you pulled earlier
- In the browser, visit `http://localhost:22935`
