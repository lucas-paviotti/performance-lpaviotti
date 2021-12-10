module.exports = {
  apps : [{
    name   : "server-cluster",
    script : "./server.js",
    watch: true,
    ignore_watch : ["node_modules", "db", ".env", ".env.example", "logs"],
    exec_mode : "cluster",
  }]
}
