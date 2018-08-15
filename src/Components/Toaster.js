import { Position, Toaster } from "@blueprintjs/core";

/** Singleton toaster instance. Create separate instances for different options. */
const AppToaster = Toaster.create({
    className: "recipe-toaster",
    position: Position.TOP,
    timeout: 4000,
    style: {"fontSize": "16px"}
});

export default AppToaster;