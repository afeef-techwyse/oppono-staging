import server from "@frontity/core/src/server";
import frontity__wp_source_default from "@frontity/wp-source/src/index";
import frontity__tiny_router_default from "@frontity/tiny-router/src/index";
import frontity__html2react_default from "@frontity/html2react/src/index";
import frontity__head_tags_default from "@frontity/head-tags/src/index";
import oppono_theme_default from "oppono-theme/src/index";

const packages = {
  frontity__wp_source_default,
  frontity__tiny_router_default,
  frontity__html2react_default,
  frontity__head_tags_default,
  oppono_theme_default,
};

export default server({ packages });

