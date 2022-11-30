//export const top_page_url: string = "https://oguemon.com/atashinchi/";
export const top_page_url: string = "https://oguemon.localhost/atashinchi/";
export const top_page_title: string = "あたしンちアニメ作品紹介｜タチバナ研";

export const amzn_links = (item_id) => {

    const main_url_base: string = "https://www.amazon.co.jp/";
    const short_url_base: string = "https://amzn.to/";
    const thum_url_base: string = "//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&Format=_SL250_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=oguemon-22&language=ja_JP&ASIN=";
    const hidden_url_base: string = "https://ir-jp.amazon-adsystem.com/e/ir?t=oguemon-22&language=ja_JP&l=li3&o=9&a=";

    const codes = {
        issue1: {
            text_link: "369xl3i",
            thum_link: "gp/product/B082WZ9XRB/ref=as_li_ss_il?ref_=dbs_p_pwh_rwt_anx_cl_0&storeType=ebooks&linkCode=li3&tag=oguemon-22&linkId=c5760813f0b704816b52513c610c51ed&language=ja_JP",
            thum_id: "B082WZ9XRB",
        },
        issue2: {
            text_link: "2zdlTrl",
            thum_link: "gp/product/B082WZ67Q1/ref=as_li_ss_il?ref_=dbs_p_pwh_rwt_anx_cl_1&storeType=ebooks&linkCode=li3&tag=oguemon-22&linkId=2c1f2390c15e2a6370b0c9d6fb88f3c7&language=ja_JP",
            thum_id: "B082WZ67Q1",
        },
        issue3: {
            text_link: "3dVrX6z",
            thum_link: "gp/product/B082WZL6Q9/ref=as_li_ss_il?ref_=dbs_p_pwh_rwt_anx_cl_1&storeType=ebooks&linkCode=li3&tag=oguemon-22&linkId=04b217044c75e48b434ea1c8efac3605&language=ja_JP",
            thum_id: "B082WZL6Q9",
        },
        issue4: {
            text_link: "3g8ymNN",
            thum_link: "gp/product/B082WZ5KNP/ref=as_li_ss_il?ref_=dbs_p_pwh_rwt_anx_cl_1&storeType=ebooks&linkCode=li3&tag=oguemon-22&linkId=270978062eea4cb79c97c49c51579cac&language=ja_JP",
            thum_id: "B082WZ5KNP",
        },
        issue5: {
            text_link: "2Xdle1b",
            thum_link: "gp/product/B082WZ5ZK3/ref=as_li_ss_il?ref_=dbs_p_pwh_rwt_anx_cl_1&storeType=ebooks&linkCode=li3&tag=oguemon-22&linkId=5bdbab37e2dac6e6e9b2bf6ffb4285cb&language=ja_JP",
            thum_id: "B082WZ5ZK3",
        },
        issue6: {
            text_link: "3bLiIV4",
            thum_link: "gp/product/B082WZJ5LG/ref=as_li_ss_il?ref_=dbs_p_pwh_rwt_anx_cl_1&storeType=ebooks&linkCode=li3&tag=oguemon-22&linkId=0856f49c8320a22b2e841320d4ff8e1e&language=ja_JP",
            thum_id: "B082WZJ5LG",
        },
        issue7: {
            text_link: "3bEHx4N",
            thum_link: "gp/product/B082WZ3497/ref=as_li_ss_il?ref_=dbs_p_pwh_rwt_anx_cl_1&storeType=ebooks&linkCode=li3&tag=oguemon-22&linkId=e4ba2b7d52c251050622b3394f874709&language=ja_JP",
            thum_id: "B082WZ3497",
        },
        issue8: {
            text_link: "2yi80aU",
            thum_link: "gp/product/B082WZBSMF/ref=as_li_ss_il?ref_=dbs_p_pwh_rwt_anx_cl_1&storeType=ebooks&linkCode=li3&tag=oguemon-22&linkId=52016b1d612de93bf774d0f7f5fb7383&language=ja_JP",
            thum_id: "B082WZBSMF",
        },
        issue9: {
            text_link: "3cLk4Av",
            thum_link: "gp/product/B082WZ81NT/ref=as_li_ss_il?ref_=dbs_p_pwh_rwt_anx_cl_1&storeType=ebooks&linkCode=li3&tag=oguemon-22&linkId=4ce1baf697246f70d5a4a7c6b2573dd7&language=ja_JP",
            thum_id: "B082WZ81NT",
        },
        issue10: {
            text_link: "2ABegv2",
            thum_link: "gp/product/B082WZR3R9/ref=as_li_ss_il?ref_=dbs_p_pwh_rwt_anx_cl_1&storeType=ebooks&linkCode=li3&tag=oguemon-22&linkId=2d5337114072a1a3739393b244b06140&language=ja_JP",
            thum_id: "B082WZR3R9",
        },
        issue11: {
            thum_link: "gp/product/B082WZS1SQ/ref=as_li_ss_il?ref_=dbs_p_pwh_rwt_anx_cl_1&storeType=ebooks&linkCode=li3&tag=oguemon-22&linkId=19efa51c98e4038995b66b9a7845fe66&language=ja_JP",
            thum_id: "B082WZS1SQ",
            text_link: "2XaHgBn",
        },
        issue12: {
            text_link: "3dWNP1m",
            thum_link: "gp/product/B082WZHL5Q/ref=as_li_ss_il?ref_=dbs_p_pwh_rwt_anx_cl_1&storeType=ebooks&linkCode=li3&tag=oguemon-22&linkId=89d7667dbe90e8271e9d355f892c0cc0&language=ja_JP",
            thum_id: "B082WZHL5Q",
        },
        issue13: {
            text_link: "36jewuE",
            thum_link: "gp/product/B082WZT6W9/ref=as_li_ss_il?ref_=dbs_p_pwh_rwt_anx_cl_1&storeType=ebooks&linkCode=li3&tag=oguemon-22&linkId=09e9dbca8adbfaced5d2ec6083e68fef&language=ja_JP",
            thum_id: "B082WZT6W9",
        },
        issue14: {
            text_link: "2LCfp83",
            thum_link: "gp/product/B082WZPF4K/ref=as_li_ss_il?ref_=dbs_p_pwh_rwt_anx_cl_1&storeType=ebooks&linkCode=li3&tag=oguemon-22&linkId=1e4ea0f7490510506ed3e92cf81848f1&language=ja_JP",
            thum_id: "B082WZPF4K",
        },
        issue15: {
            text_link: "3e1VTOy",
            thum_link: "gp/product/B082WZDCSX/ref=as_li_ss_il?ref_=dbs_p_pwh_rwt_anx_cl_1&storeType=ebooks&linkCode=li3&tag=oguemon-22&linkId=ed58114650584c36cc169417c1480974&language=ja_JP",
            thum_id: "B082WZDCSX",
        },
        issue16: {
            text_link: "3cKFJZp",
            thum_link: "gp/product/B082WZ7QSH/ref=as_li_ss_il?ref_=dbs_p_pwh_rwt_anx_cl_1&storeType=ebooks&linkCode=li3&tag=oguemon-22&linkId=fb96c6495572d6e48c7f7a7cc832b5ed&language=ja_JP",
            thum_id: "B082WZ7QSH",
        },
        issue17: {
            text_link: "3cLkjLI",
            thum_link: "gp/product/B082WZ9C37/ref=as_li_ss_il?ref_=dbs_p_pwh_rwt_anx_cl_1&storeType=ebooks&linkCode=li3&tag=oguemon-22&linkId=12aa629a1fa8ce17e9c8720f7e735cb8&language=ja_JP",
            thum_id: "B082WZ9C37",
        },
        issue18: {
            text_link: "3fYtzOR",
            thum_link: "gp/product/B082WZ3Q18/ref=as_li_ss_il?ref_=dbs_p_pwh_rwt_anx_cl_1&storeType=ebooks&linkCode=li3&tag=oguemon-22&linkId=4fd2046ce68e543329fbab0e049adfd6&language=ja_JP",
            thum_id: "B082WZ3Q18",
        },
        issue19: {
            text_link: "3cLHhlR",
            thum_link: "gp/product/B082WZ6Z59/ref=as_li_ss_il?ref_=dbs_p_pwh_rwt_anx_cl_1&storeType=ebooks&linkCode=li3&tag=oguemon-22&linkId=565304e18b04f7425c2fccd08153ff9f&language=ja_JP",
            thum_id: "B082WZ6Z59",
        },
        issue20: {
            text_link: "2zRHipO",
            thum_link: "gp/product/B082WYVZ89/ref=as_li_ss_il?ref_=dbs_p_pwh_rwt_anx_cl_1&storeType=ebooks&linkCode=li3&tag=oguemon-22&linkId=73796f80c7d4ed651e01de2bfdbd5f5a&language=ja_JP",
            thum_id: "B082WYVZ89",
        },
        issue21: {
            text_link: "36bndqJ",
            thum_link: "gp/product/B082WYXHQ2/ref=as_li_ss_il?ref_=dbs_p_pwh_rwt_anx_cl_1&storeType=ebooks&linkCode=li3&tag=oguemon-22&linkId=98188d0acad35524c25fb3affdc3bbc6&language=ja_JP",
            thum_id: "B082WYXHQ2",
        },
        fanbook: {
            text_link: "2ZgQ0c4",
            thum_link: "dp/484013233X/ref=as_li_ss_il?ie=UTF8&linkCode=li3&tag=oguemon-22&linkId=5d237c3712f435b3928294d34f73ac73&language=ja_JP",
            thum_id: "484013233X",
        }
    };

    return {
        text_link: short_url_base + codes[item_id].text_link,
        thum_link: main_url_base + codes[item_id].thum_link,
        img: thum_url_base + codes[item_id].thum_id,
        img_hidden: hidden_url_base + codes[item_id].thum_id,
    }
};
