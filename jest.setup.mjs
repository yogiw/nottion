import "@testing-library/jest-dom/extend-expect";
import "slate-test-utils/dist/cjs/mocks";

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      addListener: function () {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      removeListener: function () {},
    };
  };
