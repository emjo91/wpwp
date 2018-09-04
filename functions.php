<?php 
function theme_styles() {

	// include the css file
	$cssFilePath = glob( get_template_directory() . '/assets/dist/styles/main.min.*' );
	$cssFileURI = get_template_directory_uri() . '/assets/dist/styles/' . basename($cssFilePath[0]);
	wp_enqueue_style( 'site_main_css', $cssFileURI );
	// include the javascript file
	$jsFilePath = glob( get_template_directory() . '/assets/dist/scripts/app.min.*.js' );
	$jsFileURI = get_template_directory_uri() . '/assets/dist/scripts/' . basename($jsFilePath[0]);
	wp_enqueue_script( 'site_main_js', $jsFileURI , null , null , true );

}
add_action( 'wp_enqueue_scripts', 'theme_styles' ); 