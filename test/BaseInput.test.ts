import { mount } from "@vue/test-utils";
import BaseInput from "@/components/base/BaseInput.vue";

describe("BaseInput", () => {
  test("renders correctly", () => {
    const wrapper = mount(BaseInput);
    expect(wrapper.get("input")).toBeTruthy();
  });

  test("it shows placeholder", () => {
    const wrapper = mount(BaseInput, {
      props: { placeholder: "Input your email" },
    });
    expect(wrapper.get("input").attributes("placeholder")).toBe(
      "Input your email"
    );
  });

  test("it changes input type when type prop is given", () => {
    const wrapper = mount(BaseInput, {
      props: { type: "email" },
    });
    expect(wrapper.get("input").attributes("type")).toBe("email");
  });

  test("it changes input value", async () => {
    const wrapper = mount(BaseInput);
    const input = wrapper.find("input");
    await input.setValue("Example");
    expect(input.element.value).toBe("Example");
  });

  test("it emits event", async () => {
    const wrapper = mount(BaseInput);
    const input = wrapper.find("input");
    await input.setValue("Test");
    expect(wrapper.emitted("update:modelValue")[0][0]).toBe("Test");
  });

  test("it mounts correctly when name prop is given", () => {
    const wrapper = mount(BaseInput, {
      props: {
        name: "email",
      },
    });
    expect(wrapper).toBeTruthy();
  });
});
