import { InjectionKey } from "vue";
import { MqObject } from "./vue-mq";

export const MqKey = Symbol("Vue 3 MQ object") as InjectionKey<MqObject>;
