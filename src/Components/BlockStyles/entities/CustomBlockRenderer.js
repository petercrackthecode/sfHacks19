import {MEDIA} from "../HelperFn.js";

export const customBlockRenderer = (block) => {
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