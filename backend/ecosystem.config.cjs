// /var/www/yourswecha.com/backend/ecosystem.config.js
module.exports = {
  apps: [{
    name: "swecha-api",
    script: "server.js",
    cwd: "/var/www/yourswecha.com/backend",
    instances: 2,        // matches your 2 vCPUs; leave 0 headroom in mind for sibling apps
    exec_mode: "cluster",
    max_memory_restart: "500M",
    env: { NODE_ENV: "production" }
  }]
};
