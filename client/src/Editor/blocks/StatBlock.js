import { Node, mergeAttributes } from '@tiptap/core';
import {
  ReactNodeViewRenderer,
  NodeViewWrapper,
  NodeViewContent,
} from '@tiptap/react';
import React from 'react';
import { Sword } from 'phosphor-react';

import './StatBlock.scss';

const MONSTER_REGEX = /https:\/\/(www.)?dndbeyond.com\/monsters\/([a-zA-Z0-9-]+)/;
const PROXY_URL = `http://localhost:3000/proxy`;


const StatBlock = (props) => {
  const { editor, getPos } = props;
  return (
    <NodeViewWrapper className="stat-block">
      <span className="label" contentEditable={false}>
        <Sword /> Stat Block
      </span>
      <NodeViewContent className="content" />
    </NodeViewWrapper>
  );
};

export default {
  node: Node.create({
    name: 'statBlock',
    group: 'block',
    content: 'block*',
    defaultOptions: {
      HTMLAttributes: {},
    },
    defining: true,
    parseHTML() {
      return [
        {
          tag: 'stat-block',
        },
      ];
    },

    renderHTML({ HTMLAttributes }) {
      return [
        'stat-block',
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
        0,
      ];
    },

    addNodeView() {
      return ReactNodeViewRenderer(StatBlock);
    },
  }),
  slash: {
    title: 'stat block',
    element: (
      <span>
        <Sword /> Stat Block
      </span>
    ),
    command: ({ editor, range, props }) => {
      editor
        .chain()
        .focus()
        .insertContentAt(range, [
          {
            type: 'statBlock',
            attrs: props,
            content: [{ type: 'paragraph' }],
          },
        ])
        .run();
    },
    allow: ({ editor, range }) => {
      return editor.can().insertContentAt(range, { type: 'statBlock' });
    },
  },
};
