import { mount } from "@vue/test-utils";

import BaseButton from "../components/base/BaseButton.vue";

describe("BaseButton", () => {
  test("mounts correctly", async () => {
    expect(BaseButton).toBeTruthy();
  });

  test("displays text when passed as slot", () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: "Hello",
      },
    });
    expect(wrapper.text()).toContain("Hello");
  });
  test("renders nuxt-link when to prop given", () => {
    const wrapper = mount(BaseButton, {
      props: {
        to: "/",
      },
      slots: {
        default: "Link",
      },
    });

    expect(wrapper.element.tagName).toBe("NUXTLINK");
  });
  test("renders a when to href given", () => {
    const wrapper = mount(BaseButton, {
      props: {
        href: "https://youtube.com",
      },
      slots: {
        default: "Youtube",
      },
    });

    expect(wrapper.element.tagName.toLowerCase()).toBe("a");
    expect(wrapper.attributes("href")).toBe("https://youtube.com");
  });
});
