import { Mark, mergeAttributes } from "@tiptap/react";

export const Spoiler = Mark.create({
  name: "spoiler",

  inclusive: false,

  addOptions() {
    return {
      HTMLAttributes: {
        "data-spoiler": "",
      },
    };
  },

  addAttributes() {
    return {
      "data-spoiler": {
        default: "",
      },
    };
  },

  parseHTML() {
    return [{ tag: `span[data-spoiler]` }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands(): any {
    return {
      setSpoiler:
        (attributes: any) =>
        ({ commands }: any) => {
          return commands.setMark("spoiler", attributes);
        },
      toggleSpoiler:
        (attributes: any) =>
        ({ commands }: any) => {
          return commands.toggleMark("spoiler", attributes);
        },
      unsetSpoiler:
        () =>
        ({ commands }: any) => {
          return commands.unsetMark("spoiler");
        },
    };
  },
});
