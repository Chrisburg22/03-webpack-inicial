const HtmlWebPack = require('html-webpack-plugin');// Le inyecta a Html el script del nuevo archivo creado.
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
    mode: 'development',

    output: {
        clean: true
    },

    module: {// Definir las reglas
        rules: [
            {
                test: /\.html$/, // cada vez que se ejecute eñ build va a barrer cada uno de los archivos del proyecto, cuando encuentre un archivo html le diremos que haga lo siguiente
                loader: 'html-loader',// Mandamos a llamar el plugin instalado
                options: { // otra opción
                    sources: false // En caso de que mueva un archivo por ejemplo el html
                }
            },
            {
                test: /\.css$/,
                exclude: /style.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /style.css$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader' ]
            },
            {
                test:  /\.(png|jpe?g|gif)$/,
                loader: 'file-loader',
            }
        ]
    },

    optimization: {},

    plugins: [
        new HtmlWebPack( {
            title: 'Mi Webpack App',
           // filename: 'Hola Mundo'
           template: './src/index.html'// Archivo en el que se va a basar
        } ),
        new MiniCssExtractPlugin( {
            filename: '[name].css',
            ignoreOrder: false
        } ),
        new CopyPlugin ( { //Esto nos ayuda a importar recursos estaticos en este caso fue una imagen
            patterns: [
                { from: 'src/assets/', to: 'assets/' } // El from es de donde viene la imagen y el to es la nueva carpeta que se crea en dist
            ]
        })
    ]
}