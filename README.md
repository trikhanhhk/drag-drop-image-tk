# drag-drop-image-tk

## Description

The `drag-drop-file-tk` library provides a React component for implementing drag and drop functionality for image files. This library allows users to select one or multiple image files from their computer or drag them into a designated area for preview.

## Installation

Install the library via npm:
```bash
npm install drag-drop-file-tk
```
Or use yarn:
```bash
yarn add drag-drop-file-tk
```



## Usage

Below is an example of how to use the `DragDropFile` component in your React application:

```javascript
import React from "react";
import DragDropFile from "drag-drop-file-tk";

const App = () => {
  const handleChange = (files) => {
    // Handle selected files here
    console.log(files);
  };

  return (
    <div>
      <DragDropFile handleChange={handleChange} />
    </div>
  );
};

export default App;
```
## Props

| Prop                  | Description                                       | Type                                           | Default    |
|-----------------------|---------------------------------------------------|------------------------------------------------|------------|
| `name`                | The name of the component.                        | string                                         | -          |
| `handleChange`        | Handler function called when a file is selected   | (files: File[]) => void                        | -          |
|                       | or dragged and dropped.                          |                                                |            |
| `limit`               | Limit the number of files that can be selected.   | number                                         | -          |
| `placeholder`         | Placeholder for the drag and drop area.           | string                                         | -          |
| `title`               | Title of the drag and drop area.                  | string                                         | -          |
| `clearTitle`          | Title for the clear selected image button.        | string                                         | 'Clear image' |
| `withImagePreview`    | Width of the image preview.                       | number                                         | -          |
| `heightImagePreview`  | Height of the image preview.                      | number                                         | -          |
| `messageLimit`        | Message when exceeding the file limit.            | string                                         | -          |
| `showMessageLimit`    | Enable displaying a message when exceeding        | boolean                                        | -          |
|                       | the file limit.                                   |                                                |            |
