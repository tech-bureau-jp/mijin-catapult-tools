#!/usr/bin/env node

// Check if proxy is configured
const proxyUrl = process.env.HTTPS_PROXY || process.env.https_proxy || process.env.HTTP_PROXY || process.env.http_proxy
const hasProxy = proxyUrl && proxyUrl.trim()

if (hasProxy) {
  // Auto-set GLOBAL_AGENT_HTTP_PROXY for global-agent
  if (!process.env.GLOBAL_AGENT_HTTP_PROXY) {
    process.env.GLOBAL_AGENT_HTTP_PROXY = proxyUrl
  }
  // Enable global-agent for proxy support
  require('global-agent/bootstrap')
}

process.removeAllListeners('warning')
require('../dist/main.js')
