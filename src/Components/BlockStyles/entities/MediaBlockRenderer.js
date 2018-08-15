import React from "react";

import {MEDIA} from "../HelperFn.js";

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