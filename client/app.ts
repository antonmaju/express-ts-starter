declare var $: any;

import { initAbout } from "./about";
import { initHome } from "./home";

require("../public/scss/main.scss");

$(function(){
    initAbout();
    initHome();
});