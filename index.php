<?php
/**
 * Plugin Name:       Gutenburg block plugin
 * Plugin URI:        https://example.com/plugins/the-basics/
 * Description:       Handle the basics with this plugin.
 * Version:           1.10.3
 * Requires at least: 5.2
 * Requires PHP:      7.2
 * Author:            hicham
 * Author URI:        https://author.example.com/
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 */

 if ( ! defined("ABSPATH") ) {
     exit("you cannot access this file directely");
 }

 class GutenburgBlockPluginAnswers {
     function __construct() {
         add_action("init", array($this, "blockinit"));
     }

     function blockinit() {
         wp_register_style("block-answers-editor-css", plugin_dir_url(__FILE__) . "build/main.css");
         wp_register_script("block-answers-editor-js", plugin_dir_url(__FILE__) . "build/index.js", array("wp-blocks", "wp-element", "wp-editor"));
         register_block_type( "wpcustomblocks/wp-block-answers", array(
             "editor_script" => "block-answers-editor-js",
             "editor_style" => "block-answers-editor-css",
             "render_callback" => array($this, "saveblock")
         ));
     }

     function saveblock($attr) {
         if (!is_admin()) {
             wp_enqueue_script("frontend-block-question-js", plugin_dir_url(__FILE__). "build/frontend.js", array("wp-element"));
             wp_enqueue_style("frontend-block-question-css", plugin_dir_url(__FILE__). "build/frontend.css");
         }
         ob_start(); ?>
         <div class="frontend-block-questions"><pre style="display: none"><?php echo wp_json_encode($attr) ?></pre></div>
         <?php return ob_get_clean();
     }
 }

 $gutentburgblockpluginanswers = new GutenburgBlockPluginAnswers();