import { mount } from "@vue/test-utils";
import BaseSelect from "@/components/base/BaseSelect.vue";

describe("BaseSelect", () => {
  test("mounts correctly", () => {
    const wrapper = mount(BaseSelect);
    expect(wrapper).toBeTruthy();
  });

  test("it renders select element", () => {
    const wrapper = mount(BaseSelect);
    expect(wrapper.find("select")).toBeTruthy();
  });
});
