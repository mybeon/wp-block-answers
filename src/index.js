import { TextControl, Button, Icon, PanelBody, PanelRow, ColorPicker } from "@wordpress/components"
import {InspectorControls} from "@wordpress/block-editor"
import {ChromePicker} from "react-color"

wp.blocks.registerBlockType("wpcustomblocks/wp-block-answers", {
    title: "block quiz",
    description: "this is a block where you ask your audience's attention.",
    icon: "text-page",
    category: "widgets",
    attributes: {
        question: {type: "string"},
        answers: {type: "array", default: [""]},
        correctAnswer: {type: "number", default: undefined},
        bgcolor: {type: "string", default:"#ffff"}
    },
    example: {
        attributes : {
            question: "your question",
            answers: ["answer1", "answer2", "answer3"],
            correctAnswer: 1,
            bgcolor: "#ebebeb"
        }
    },
    edit: EditBlockQuiz,
    save: function () {
        return null
    }
})

function EditBlockQuiz(props) {
    console.log(props.attributes);
    function updatequestion(value) {
        props.setAttributes({question: value})
    }

    function deleteBlock (indextodelete) {
        console.log(indextodelete);
        const newAnswers = props.attributes.answers.filter((x, index) => {
            return index != indextodelete
        })
        props.setAttributes({answers: newAnswers})
    }

    return( 
        <div className="block_component_quiz" style={{backgroundColor: props.attributes.bgcolor}}>
            <InspectorControls>
                <PanelBody title="background color">
                    <PanelRow>
                        <ChromePicker disableAlpha={true} color={props.attributes.bgcolor} onChangeComplete={value => props.setAttributes({bgcolor: value.hex})} />
                    </PanelRow>
                </PanelBody>
            </InspectorControls>
            <TextControl label="Question :" style={{fontSize: "20px"}} value={props.attributes.question}  onChange={updatequestion}/>
            <p>answers :</p>
            {props.attributes.answers.map((answer, index) => {
                return (
                <div className="answers-editor">
                    <TextControl autoFocus={ answer == undefined } value={answer} onChange={(value) => {
                        const newAnswers = props.attributes.answers.concat([])
                        newAnswers[index] = value
                        props.setAttributes({answers: newAnswers})
                    }} />
                    <Button onClick={() => {
                        props.setAttributes({correctAnswer: index})
                    }}>
                        <Icon className="icon_block" icon={props.attributes.correctAnswer == index ? "star-filled" : "star-empty"}/>
                    </Button>
                    <Button  onClick={() => deleteBlock(index)} className="delete_block">Delete</Button>
                </div>
                )
            })}
            <Button onClick={() => {
                props.setAttributes({answers: props.attributes.answers.concat([undefined])})
            }} isPrimary>add another answer</Button>
        </div>
    )
}