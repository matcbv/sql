const path = require("path")

/** @type {import("tailwindcss").Config} */

module.exports = {
    content: ["src/views/**/*.html"],
    theme: {
        extend: {
            
        }
    },
    corePlugins: {
        preflight: false
    }
}