import {
  assertStringContains,
  assert,
} from "https://deno.land/std@0.60.0/testing/asserts.ts";

import {
  getTemplateHtml as getTemplateHtml_Local,
  IOverrideInfo as IOverrideInfo_Local,
} from "../../dist/endpoints/success-criterion-focused.ts";

Deno.test("Imports interface from local dist folder", () => {
  //Arrange
  const overrideInfo: IOverrideInfo_Local = {
    content: {
      "contextual-text": "dummy",
      "email-preview-text": "dummy",
      "header": "dummy",
      "section-header": "dummy",
      "section-header-subheading": "dummy",
      "main-content": "dummy",
      "example-content": "dummy",
    },
    links: {
      "more-info": "dummy",
      "subscribe": "dummy",
      "contact-us": "dummy",
      "unsubscribe": "dummy"
    },
  };

  //Act

  //Assert
  assert(true); //Proof that the declaration compiled
});

Deno.test("Imports template from local dist folder", async () => {
  //Arrange

  //Act
  const templateHtml = await getTemplateHtml_Local();

  //Assert
  assertStringContains(templateHtml, "html");
});

import {
  getTemplateHtml as getTemplateHtml_Remote,
  IOverrideInfo as IOverrideInfo_Remote,
} from "https://raw.githubusercontent.com/Grunet/digestible-wcag-templates/master/dist/endpoints/success-criterion-focused.ts";

Deno.test("Imports template from remote repository", async () => {
  //Arrange

  //Act
  const templateHtml = await getTemplateHtml_Remote();

  //Assert
  assertStringContains(templateHtml, "html");
});

Deno.test("Imports interface from remote repository", () => {
  //Arrange
  const overrideInfo: IOverrideInfo_Remote = {
    content: {
      "contextual-text": "dummy",
      "email-preview-text": "dummy",
      "header": "dummy",
      "section-header": "dummy",
      "section-header-subheading": "dummy",
      "main-content": "dummy",
      "example-content": "dummy",
    },
    links: {
      "more-info": "dummy",
      "subscribe": "dummy",
      "contact-us": "dummy",
      "unsubscribe": "dummy"
    },
  };

  //Act

  //Assert
  assert(true); //Proof that the declaration compiled
});
