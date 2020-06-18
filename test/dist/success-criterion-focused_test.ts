import {
  assertStrContains,
  assert,
} from "https://deno.land/std/testing/asserts.ts";

import {
  getTemplateHtml,
  IOverrideInfo,
} from "../../dist/endpoints/success-criterion-focused.ts";

Deno.test("Imports interface from local dist folder", () => {
  //Arrange
  const overrideInfo: IOverrideInfo = {
    content: {
      "contextual-text": "dummy",
      "email-preview-text": "dummy",
      "header": "dummy",
      "section-header": "dummy",
      "main-text": "dummy",
    },
    links: {
      "more-info": "dummy",
      "techniques": "dummy",
    },
  };

  //Act

  //Assert
  assert(true); //Proof that the declaration compiled
});

Deno.test("Imports template from local dist folder", async () => {
  //Arrange

  //Act
  const templateHtml = await getTemplateHtml();

  //Assert
  assertStrContains(templateHtml, "html");
});
