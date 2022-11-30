import React from "react"

const ComicLabel: React.FC<ComicInfo> = (props) => {

    const { issue, no } = props;

    let additioal_class_name: string = "issue" + String(issue);
    let label_name: string = String(issue) + "巻" + ((no === 0)? "特別編" : "No." + String(no));

    if (issue == 0) {
        additioal_class_name = "";
        label_name = "単行本未収録";
    }
    else if (issue == 99) {
        additioal_class_name = "fanbook";
        label_name = "公式ファンブックNo." + String(no);
    }

    return (
        <div className={"comic " + additioal_class_name}>
            { label_name }
        </div>
    );
}

export default ComicLabel;
