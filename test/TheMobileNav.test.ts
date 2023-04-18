import { mount } from "@vue/test-utils";
import TheMobileNav from "@/components/TheMobileNav.vue";

describe("TheMobileNav", () => {
  test("mounts correctly", () => {
    expect(TheMobileNav).toBeTruthy();
  });

  test("renders 5 nav items", () => {
    const wrapper = mount(TheMobileNav);
    expect(wrapper.element.childNodes.length).toBe(5);
  });
});
