/**
 * @app GoolgeReviewWidget
 * @desc A widget pulls up to 5 Google reviews using Google Place Javascript API
 * @version 1.0.0
 * @license The MIT License (MIT)
 * @author Leo Lee
 */
!(function (e, r, t) {
    "use strict";
    var i = {};
    (i.helpers = {
        extendObj: function () {
            for (var e = 1; e < arguments.length; e++)
                for (var r in arguments[e])
                    arguments[e].hasOwnProperty(r) &&
                        (arguments[e][r] && arguments[e][r].constructor && arguments[e][r].constructor === Object
                            ? ((arguments[0][r] = arguments[e][r] || {}), this.extendObj(arguments[0][r], arguments[e][r]))
                            : (arguments[0][r] = arguments[e][r]));
            return arguments[0];
        },
        createElem: function (e, r) {
            var t = document.createElement(e);
            for (var i in r) t.setAttribute(i, r[i]);
            return t;
        },
        ellipsis: function (e, r) {
            var t = e.textContent,
                a;
            if (t.split(/\s+/).length > r) {
                var l = t.split(/\s+/, r).join(" ") + "...";
                e.textContent = l;
                var n = document.createElement("div"),
                    s = i.helpers.createElem("a", { class: "rm-link" });
                (s.textContent = "Read More"),
                    n.appendChild(s),
                    e.parentElement.appendChild(n),
                    s.addEventListener("click", function () {
                        "true" !== this.getAttribute("data-clicked")
                            ? ((e.textContent = t), (this.textContent = "Read Less"), this.setAttribute("data-clicked", !0))
                            : ((e.textContent = l), (this.textContnet = "Read More"), this.setAttribute("data-clicked", !1));
                    });
            }
        },
        initSlider: function (e) {
            for (var r = e.querySelectorAll(".grw-slider-nav a"), t = e.querySelector(".grw-slider-wrapper"), i = 0; i < r.length; i++) {
                var a = r[i];
                document.addEventListener &&
                    a.addEventListener(
                        "click",
                        function (i) {
                            i.preventDefault();
                            var a = this;
                            a.className = "grw-slide-current";
                            for (var l = 0; l < r.length; ++l) {
                                var n = r[l];
                                n !== a && (n.className = "");
                            }
                            var s = parseInt(a.getAttribute("data-grw-slide"), 10) + 1,
                                d = e.querySelector(".grw-review-slide:nth-child(" + s + ")");
                            t.style.left = "-" + d.offsetLeft + "px";
                        },
                        !1
                    );
            }
        },
    }),
        (i.init = function (e) {
            var r = { target: "", placeid: "", theme: "dark", numOfWords: 20, horizontal: !0, autoScroll: !1, scrollInterval: 8 };
            e = i.helpers.extendObj({}, r, e);
            var t = document.querySelector(e.target);
            if (t) {
                if ("" === e.placeid || !google) return;
                var a;

                new google.maps.places.PlacesService(document.querySelector(e.target)).getDetails({ placeId: e.placeid }, function (r, a) {
                    if (a === google.maps.places.PlacesServiceStatus.OK) {
                        var l = i.helpers.createElem("div", { class: "grw-wrapper" });
                        t.appendChild(l);
                        var n = i.helpers.createElem("div", { class: "google-reviews grw-theme-" + e.theme });
                        l.appendChild(n);

                        var s = i.buildWidgetHeader(r),
                            d = i.buildReviews(r, e),
                            c = i.buildWidgetFooter(),
                            o;
                        if ((n.appendChild(s), n.appendChild(d), n.appendChild(c), e.numOfWords > 0))
                            document.querySelectorAll(".grw-review-content p").forEach(function (r, t) {
                                i.helpers.ellipsis(r, e.numOfWords);
                            });
                    }
                });
            }
        }),
        (i.buildWidgetHeader = function (e) {
            var r = e.name,
                t = e.url,
                a = e.rating,
                l = i.helpers.createElem("div", { class: "grw-business-header grw-clear-fix" });
            return (
                (l.innerHTML =
                    '<div class="grw-header-content-wrapper"><span class="grw-business-name"><a href="' +
                    t +
                    '" rel="nofollow" target="_blank" title="' +
                    r +
                    '">' +
                    r +
                    '</a></span><div class="grw-google-rating-content"><div class="grw-google-star-rating-wrapper"><div class="grw-google-star-rating" style="width:' +
                    Math.round((67 * a) / 5) +
                    'px"></div></div></div><div class="grw-rating-value">' +
                    a +
                    " out of 5 stars</div></div>"),
                l
            );
        }),
        (i.buildReviews = function (e, r) {
            e.reviews = e.reviews.filter((e) => e.rating >= 4);
            var t = "grw-reviews-wrapper",
                a = "grw-review",
                l = i.helpers.createElem("div", { class: "grw-reviews-compact grw-slider" }),
                n = i.helpers.createElem("div", { class: "grw-slider-nav" });
            r.horizontal && ((t = "grw-reviews-wrapper grw-slider-wrapper"), (a = "grw-review grw-review-slide"));
            for (var s = i.helpers.createElem("div", { class: t }), d = e.reviews, c = 0; c < d.length; c++) {
                var o = d[c].author_name,
                    v = d[c].rating,
                    g = d[c].text,
                    p =
                        '<div class="' +
                        a +
                        '"><div class="grw-review-rating"><div class="grw-google-star-rating-wrapper"><div class="grw-google-star-rating" style="width:' +
                        Math.round((67 * v) / 5) +
                        'px"></div></div></div><div class="grw-review-content"><p>' +
                        g +
                        `</p><div class="grw-author">- ${o}</div></div></div>`;
                s.innerHTML += p;
                var u = i.helpers.createElem("a", { href: "#", "data-grw-slide": c });
                0 == c && (u.className = "grw-slide-current"), n.appendChild(u);
            }
            return r.horizontal
                ? (l.appendChild(s),
                    l.appendChild(n),
                    i.helpers.initSlider(l),
                    !0 === r.autoScroll &&
                    setInterval(function () {
                        var e,
                            r = n.querySelector(".grw-slide-current").nextSibling;
                        null == r && (r = n.firstChild), r.click();
                    }, 1e3 * r.scrollInterval),
                    l)
                : s;
        }),
        (i.buildWidgetFooter = function () {
            var e = i.helpers.createElem("div", { class: "grw-business-footer grw-clear-fix" });
            return (e.innerHTML = '<div class="poweredByGoogle"></div>'), e;
        }),
        (window.$GrwJS = i);
})(this, this.document);
