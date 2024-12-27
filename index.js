import { registerRootComponent } from "expo";
import "react-native-get-random-values";
import "core-js/full/symbol";
import "core-js/full/promise";
import "core-js/full/url";
import "core-js/web/immediate";
import "core-js/features/abort-controller";
import "core-js/features/array-buffer";
import "core-js/features/structured-clone";
import "core-js/web/timers";
import "core-js/web/dom-collections";

import App from "./App";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
