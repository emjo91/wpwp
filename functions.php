<?php 
function theme_styles() {

wp_enqueue_style( 'site_main_css', get_template_directory_uri() . '/assets/dist/styles/main.min.css' );
wp_enqueue_script( 'site_main_js', get_template_directory_uri() . '/assets/dist/scripts/app.min.js' , null , null , true );

}
add_action( 'wp_enqueue_scripts', 'theme_styles' );