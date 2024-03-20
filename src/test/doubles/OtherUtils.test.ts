import {
  calculateComplexity,
  toUpperCaseWithCallback,
} from "../../app/doubles/OtherUtils";

describe("Other test suite", () => {
  describe("Tracking callbacks with Jest mocks", () => {
    const callBackMock = jest.fn();

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("calls callback for invalid argument - track calls", () => {
      const actual = toUpperCaseWithCallback("", callBackMock);
      expect(actual).toBeUndefined();
      expect(callBackMock).toBeCalledWith("Invalid argument!");
      expect(callBackMock).toBeCalledTimes(1);
    });

    it("calls callback for valid argument - track calls ", () => {
      const actual = toUpperCaseWithCallback("abc", callBackMock);
      expect(actual).toBe("ABC");
      expect(callBackMock).toBeCalledWith("called function with abc");
      expect(callBackMock).toBeCalledTimes(1);
    });
  });

  describe("Tracking callback", () => {
    let cbArgs = [];
    let timesCalled = 0;

    function callBackMock(arg: string) {
      cbArgs.push(arg);
      timesCalled++;
    }

    afterEach(() => {
      // clearing tracking filled
      cbArgs = [];
      timesCalled = 0;
    });

    // mock
    it("calls callback for invalid argument - track calls", () => {
      const actual = toUpperCaseWithCallback("", callBackMock);
      expect(actual).toBeUndefined();
      expect(cbArgs).toContain("Invalid argument!");
      expect(timesCalled).toBe(1);
    });

    it("calls callback for valid argument - track calls", () => {
      const actual = toUpperCaseWithCallback("abc", callBackMock);
      expect(actual).toBe("ABC");
      expect(cbArgs).toContain("called function with abc");
      expect(timesCalled).toBe(1);
    });
  });

  // fakes
  it("ToUpperCase - calls callback for invalid argument", () => {
    const actual = toUpperCaseWithCallback("", () => {});

    expect(actual).toBeUndefined();
  });

  it("ToUpperCase - calls callback for valid argument", () => {
    const actual = toUpperCaseWithCallback("abc", () => {});

    expect(actual).toBe("ABC");
  });
  // end

  it("Calculates complexity", () => {
    const someInfo = {
      length: 5,
      extraInfo: {
        field1: "someInfo",
        field2: "someOtherInfo",
      },
    };

    const actual = calculateComplexity(someInfo as any);
    expect(actual).toBe(10);
  });
});
