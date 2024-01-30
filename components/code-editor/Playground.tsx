'use client';
import Editor from "@/components/Editor";

interface PlaygroundProps {
    displayName: string
}

const Playground = ({displayName}: PlaygroundProps) => {
  return (
      <>
          <div className='pane top-pane'>
            <Editor />
          </div>
          <div className='pane'></div>
          <iframe
              className='pane'
              title='output'
              sandbox='allow-scripts'
              style={{border: 'none'}}
              width='100%'
              height='100%'
          />
      </>
  )
}

export default Playground