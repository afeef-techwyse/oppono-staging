import React from 'react';
import { css, Global } from 'frontity';
import GoogleReviewsIcon from '../assets/google-review/google-reviews.png';


const WidgetStyle = () => <Global styles={css`

.grw-wrapper{

	font-family:  Helvetica,Arial,sans-serif;
	max-width:480px;
    position:absolute;
	bottom:0;
	left:50px;
    @media (max-width: 991.98px) {
        position: relative;
        left:0;
        margin-bottom: 0px;
    }
}

.grw-business-header{
    display:none;
	margin: 0 0 10px;
}

.grw-header-content-wrapper{
    display:none;
	text-align:center;
	padding: 3px 0;

}
.grw-business-name{
	display: block;
    margin: 0 0 6px;
    line-height: 16px;
}
.grw-business-name a, .grw-business-name a:visited{
	
	color: #dd4c39;
    font-weight: 700;
    text-decoration: none;
    font-size: 15px;
    line-height: 18px;
    border: none;
    border-bottom: none;
}
.grw-google-rating-content{
	width: 67px;
    margin: auto;
}

.grw-google-logo-wrapper{
	float: left;
    height: 18px;
}

.grw-google-logo-wrapper img, .grw-yelp-logo-wrapper img{
	border:none !important;
}
.grw-rating-value, .grw-review-count{
	clear:both;
	text-align:center;
	margin: 0;
    font-size: 12px;
    padding: 5px 0;
}
.grw-clear-fix:after, .grw-clear-fix:before {
    display: table;
    content: "";
    line-height: 0;
	clear:both;
}
.gpw-clear-fix:after {
    clear: both;
}
div.grw-review {
    margin: 0 0 5px;
    padding: 0;
}
div.grw-review-content {
    clear: both;
    
	padding: 5px 0 5px;
}
.grw-review-content[data-readmore] {
    transition: height 100ms;
    overflow: hidden;
}
.grw-author{
    display: inline;
	font-size:11px;
	color:#7f9bd0;
    font-weight: 700;
    white-space: nowrap;
    margin-left: 10px;
}
.grw-review-rating{
	float:right;
}
div.grw-review-content>p {
    display: inline;
	font-size: 13px;
    font-weight: 600;
    line-height: 18px;
	margin: 0px;
    color: ;
}
div.grw-review-content .rm-link{
	display:none;
}
.grw-attributions{
	font-size:12px;
	text-align:center;
	padding:5px 0;
}
.grw-attributions a, .grw-attributions a:visited{
	text-decoration:none;
	
}
.grw-slider{
    min-width: 450px;
	margin-left:30px;
	overflow: hidden;
    
    @media (max-width: 370px) {
        min-width: 280px;
        width: 280px;
    }
}
.grw-slider .grw-reviews-wrapper{
	width: 9999px;
	position: relative;
	transition: left 400ms ease-in-out;
	left:0px;
	
}
.grw-slider .grw-reviews-wrapper .grw-review-slide{
	float: left;
	width: 450px;
	position: relative;
	overflow: hidden;
    
    @media (max-width: 370px) {
        width: 280px;
    }
}
.grw-slider .grw-slider-nav{
    display: none;
	text-align:center;
	padding:0;
}

.grw-opacity{
	opacity:0.8;
	-moz-opacity:0.8;
	-webkit-opacity:0.8;
	filter:alpha(opacity=80);
}

.grw-theme-light .rm-link{
	color:#7E7975;
}
.grw-theme-light,.grw-theme-dark{
    display:flex;
    flex-direction:row-reverse;
	padding:0px;
    @media (max-width: 991.98px) {
        flex-direction:column;
    }
    @media (min-width: 991.98px) {
        align-items: center;
    justify-content: center;
    }
}

.grw-theme-dark{
	color: #7f9bd0;
}
.grw-theme-dark div.grw-review-content>p {
    color: #7f9bd0;
}
.grw-theme-dark .rm-link{
	color:#999;
}
.grw-theme-light .poweredByGoogle{
	margin:auto;
    background-image: url(${GoogleReviewsIcon});
	background-repeat:no-repeat;
    background-size: contain;
	width:90px;
	height:50px;
}
.grw-theme-dark .poweredByGoogle{
	margin:auto;
    background-image: url(${GoogleReviewsIcon});
	background-repeat:no-repeat;
    background-size: contain;
	width:90px;
	height:50px;
}

.grw-theme-light .grw-slider-nav a{
	display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #bbb;
    margin: 0 10px;
}
.grw-theme-light .grw-slider-nav a.grw-slide-current{
	background-color:#666;
}
.grw-theme-dark .grw-slider-nav a{
	display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #888;
    margin: 0 10px;
}
.grw-theme-dark .grw-slider-nav a.grw-slide-current{
	background-color:#fff;
}

.grw-theme-light .grw-rating-value, .grw-theme-light .grw-review-count{
	color:#7E7975;
}
.grw-theme-dark .grw-rating-value, .grw-theme-dark .grw-review-count{
	color:#fff;
}
.grw-business-footer {
    @media (max-width: 991.98px) {
        margin-top: 0px;
    }
}

`} />;

export default WidgetStyle;