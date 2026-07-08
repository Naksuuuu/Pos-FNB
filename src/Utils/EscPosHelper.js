// ESC/POS Command codes
const ESC = 0x1B;
const GS = 0x1D;
const LF = 0x0A;

export const ESC_POS = {
  INIT: new Uint8Array([ESC, 0x40]),
  ALIGN_LEFT: new Uint8Array([ESC, 0x61, 0]),
  ALIGN_CENTER: new Uint8Array([ESC, 0x61, 1]),
  ALIGN_RIGHT: new Uint8Array([ESC, 0x61, 2]),
  BOLD_ON: new Uint8Array([ESC, 0x45, 1]),
  BOLD_OFF: new Uint8Array([ESC, 0x45, 0]),
  DOUBLE_FONT_ON: new Uint8Array([GS, 0x21, 0x11]), // Double width & height
  DOUBLE_FONT_OFF: new Uint8Array([GS, 0x21, 0x00]),
  FEED_3_LINES: new Uint8Array([ESC, 0x64, 3]),
  PAPER_CUT: new Uint8Array([GS, 0x56, 0]),
  LINE_FEED: new Uint8Array([LF]),
};

export const formatRow = (left, right, width = 32) => {
  const spacesNeeded = width - left.length - right.length;
  if (spacesNeeded <= 0) {
    return left.slice(0, width - right.length - 1) + " " + right;
  }
  return left + " ".repeat(spacesNeeded) + right;
};

export class ReceiptBuilder {
  constructor() {
    this.buffer = [];
  }

  addBytes(bytes) {
    this.buffer.push(...bytes);
    return this;
  }

  addText(text) {
    const encoder = new TextEncoder();
    this.addBytes(encoder.encode(text));
    return this;
  }

  addLine(text = "") {
    this.addText(text);
    this.addBytes(ESC_POS.LINE_FEED);
    return this;
  }

  init() {
    return this.addBytes(ESC_POS.INIT);
  }

  alignCenter() {
    return this.addBytes(ESC_POS.ALIGN_CENTER);
  }

  alignLeft() {
    return this.addBytes(ESC_POS.ALIGN_LEFT);
  }

  alignRight() {
    return this.addBytes(ESC_POS.ALIGN_RIGHT);
  }

  bold(on = true) {
    return this.addBytes(on ? ESC_POS.BOLD_ON : ESC_POS.BOLD_OFF);
  }

  doubleFont(on = true) {
    return this.addBytes(on ? ESC_POS.DOUBLE_FONT_ON : ESC_POS.DOUBLE_FONT_OFF);
  }

  divider() {
    return this.addLine("--------------------------------");
  }

  row(left, right) {
    return this.addLine(formatRow(left, right));
  }

  feedAndCut() {
    this.addBytes(ESC_POS.FEED_3_LINES);
    this.addBytes(ESC_POS.PAPER_CUT);
    return this;
  }

  build() {
    return new Uint8Array(this.buffer);
  }
}
