import React, { useEffect } from "react";

const ScrollToTopOnMount: React.FC = () => {

    // 初回実行時のみトップへ移動
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (null);
}

export default ScrollToTopOnMount;
