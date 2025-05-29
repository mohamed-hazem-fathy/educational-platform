import { defineType, defineField } from 'sanity'
import Image from 'next/image';
export const studentType =  defineType({
    name: 'student',
    title: 'Student',
    type: 'document',
    fields: [
        defineField({
            name: 'firstName',
            title: 'First Name',
            type: 'string',

        }),
        defineField({
            name: 'lastName',
            title: 'Last Name',
            type: 'string',

        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
            validation: Rule => Rule.required().email(),
        }),
        defineField({
            name: 'clerId',
            title: 'Clerk User ID',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'imageUrl',
            title: 'Profile Image URL',
            type: 'url',
        }),
        defineField({
            name: 'createdAt',
            title: 'Created At',
            type: 'datetime',
            readOnly: true,
            initialValue: () => new Date().toISOString(),
        }),
    ],
    preview: {
  select: {
    firstName: "firstName",
    lastName: "lastName",
    imageUrl: "imageUrl",
  },
  prepare({ firstName, lastName, imageUrl }) {
    return {
      title: `${firstName.charAt(0).toUpperCase()}${firstName.slice(1)} ${lastName.charAt(0).toUpperCase()}${lastName.slice(1)}`,
      media: (
        <Image
          src={imageUrl}
          alt={`${firstName} ${lastName}`}
          width={100}
          height={100}
        />
      ),
    };
  },
},


})