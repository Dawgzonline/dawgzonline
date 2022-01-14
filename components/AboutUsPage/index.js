import React from "react";
import Info from "../Info";

export default function AboutUsPage() {
  const contents = [
    {
      title: "",
      content:
        ["Lorem ipsum dolor sit amet, consectetur adipisicing elit, set do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco loboris nisi ut aliquip ex ea commodo consequat. Duis aute urure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla."],
      width: {}
    },
    {
      title: "",
      content: ["Excepteur sint occaecat cupidatat not proident, sunt in culpa quiofficia deserunt mollit anim id est laborum. Set ut perpiciatis unde omnis iste natus error sit voluptatem accusantium dolor-emque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis"],
      width: {},
    },
    {
      title: "",
      content: ["quasi architecto beatae vitae dicta sunt explicabo. Nemo enimipsam voluptatem quia voluptas sit aspernatur aut odit aur fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,"],
      width: {},
    },
    {
        title: "",
        content: ["qui doloremipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore etdolore magnam aliquam quaerat voluptatem."],
        width: {},
    }
  ];

  return <Info heading=" US" contents={contents}/>;
}
