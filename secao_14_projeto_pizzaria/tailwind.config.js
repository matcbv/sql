/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['**/*.ejs'],
    theme: {
        extend:{
            maxWidth: {
                "100": "100vw"
            }
        }
    },
    corePlugins: {
        preflight: false
    }
}