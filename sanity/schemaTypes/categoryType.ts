import { defineField, defineType } from "sanity";
import React from "react";
import { Divider } from "sanity/structure";
import style from "styled-jsx/style";

export const categoryType = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      description: "Icon identifier (e.g., for using with icon libraries or emojis)",
    }),
      defineField({
      name: "color",
      title: "Color",
      type: "string",
      description: "Color code for the category (e.g., #FF0000)",
      validation: (rule) => rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
        name: "hex-color",
        invert: false,
      }).error('Please enter a valid hex color code (e.g., #FF0000)'),
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "description",
      icon: "icon",
    },
    prepare({
      title,
      subtitle,
      icon,
      color,
    }: {
      title?: string;
      subtitle?: string;
      icon?: string;
      color?: string;
    }) {
      return {
        title: icon ? `${icon} ${title}` : title,
        subtitle: subtitle || "",
        media: () =>
          //Use React.createElement to avoid JSX syntax error
          // @ts-ignore - Sanity expects a React element here
          React.createElement('div', {
            style: {
              backgroundColor: color || '#ccc',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
            },
          }),
      };
    },
  },
});
