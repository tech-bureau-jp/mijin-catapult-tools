#!/usr/bin/env node

// Auto-set GLOBAL_AGENT_HTTP_PROXY if not set but HTTP_PROXY or HTTPS_PROXY is set
if (!process.env.GLOBAL_AGENT_HTTP_PROXY) {
  const proxyUrl = process.env.HTTPS_PROXY || process.env.https_proxy || process.env.HTTP_PROXY || process.env.http_proxy
  if (proxyUrl) {
    process.env.GLOBAL_AGENT_HTTP_PROXY = proxyUrl
  }
}

// Enable global-agent for proxy support
if (process.env.HTTP_PROXY || process.env.HTTPS_PROXY || process.env.http_proxy || process.env.https_proxy) {
  require('global-agent/bootstrap')
}

process.removeAllListeners('warning')
require('../dist/main.js')
