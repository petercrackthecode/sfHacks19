import React from "react";
import { EditorState, RichUtils, AtomicBlockUtils } from "draft-js";

import {IMAGE, MEDIA} from "../HelperFn.js";

export const mediaBlockRenderer = (block) => {
    if (block.getType() === "atomic") {
        return {
            component: MEDIA,
            editable: false,
            props: {
                foo: 'bar',
            },
        };
    }
};