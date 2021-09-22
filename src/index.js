import Modeler from "bpmn-js/lib/Modeler";

import "bpmn-js/dist/assets/diagram-js.css";

// import BPMN font
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";

import camundaModdlePackage from "camunda-bpmn-moddle/resources/camunda";
import camundaModdleExtension from "camunda-bpmn-moddle/lib";

import propertiesPanelModule from "bpmn-js-properties-panel";

import propertiesProviderModule from "bpmn-js-properties-panel/lib/provider/camunda";

import "bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css";

import "./styles.css";

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Camunda Modeler" exporterVersion="3.3.5">
  <bpmn:process id="Process_1" isExecutable="true">
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;

const container = document.getElementById("container");

class CustomContextPadProvider {
  constructor(contextPad) {
    contextPad.registerProvider(this);
  }

  getContextPadEntries(element) {
    return function(entries) {
      delete entries["append.end-event"];

      return entries;
    };
  }
}

CustomContextPadProvider.$inject = ["contextPad"];

const modeler = new Modeler({
  container,
  additionalModules: [
    {
      __init__: ["customContextPadProvider"],
      customContextPadProvider: ["type", CustomContextPadProvider]
    },
    camundaModdleExtension,
    propertiesPanelModule,
    propertiesProviderModule
  ],
  keyboard: {
    bindTo: document
  },
  moddleExtensions: {
    camunda: camundaModdlePackage
  },
  propertiesPanel: {
    parent: "#properties"
  }
});

modeler.importXML(xml, err => {
  if (err) {
    console.error(err);
  }

  const canvas = modeler.get("canvas");

  canvas.zoom("fit-viewport");
});
