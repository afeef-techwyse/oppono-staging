import client from "@frontity/core/src/client";
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

export default client({ packages });

if (module["hot"]) {
  module["hot"].accept(
    [
      "@frontity/core/src/client",
      "@frontity/wp-source/src/index",
      "@frontity/tiny-router/src/index",
      "@frontity/html2react/src/index",
      "@frontity/head-tags/src/index",
      "oppono-theme/src/index",
    ],
    () => {
      const client = require("@frontity/core/src/client").default;
      const frontity__wp_source_default = require("@frontity/wp-source/src/index").default;
      const frontity__tiny_router_default = require("@frontity/tiny-router/src/index").default;
      const frontity__html2react_default = require("@frontity/html2react/src/index").default;
      const frontity__head_tags_default = require("@frontity/head-tags/src/index").default;
      const oppono_theme_default = require("oppono-theme/src/index").default;
      const packages = {
        frontity__wp_source_default,
        frontity__tiny_router_default,
        frontity__html2react_default,
        frontity__head_tags_default,
        oppono_theme_default,
      };
      client({ packages, isHmr: true });
    }
  );
}