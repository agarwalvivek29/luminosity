from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import re
from dotenv import load_dotenv
from langchain_openai import AzureChatOpenAI
from langchain.prompts import PromptTemplate
import os
from openai import OpenAI

load_dotenv('.env')

llm = AzureChatOpenAI(
        azure_deployment="gpt-4o",
        api_version=os.environ["OPENAI_API_VERSION"],
        temperature=0.15,
        max_tokens=None,
        timeout=None,
        max_retries=2,
        api_key=os.environ["AZURE_OPENAI_KEY"]

    )
sys_template = """You are a helpful manim coder that first writes all steps involved in creating the video to clarify the user query. steps to be followed are as follows:\n 1)Write down the each and every step involved in solving the problem.\n 2) then based on the steps write a simple manim code step by step without missing any crucial steps like avoiding overlap of multiple texts, missing componeents, wrong calculations etc.. 3) Finally go through the code once again making sure the logic holds and all the rules are followed. 4) Always make sure the code is ready to run state meaning that, do not ommit any lines for breivity. 4) If the process to the solution is lengthy, then make the video also suitably big or small."""

def generate_manim_code(question):
    q_template = """{question}"""

    q_prompt = PromptTemplate(
        template=q_template,
        input_variables=["question"]
    )

    q_prompt = q_prompt.invoke({"question":question})
    voice_over_temp = """
    from manim import *
    from manim_voiceover import VoiceoverScene
    from manim_voiceover.services.gtts import GTTSService


    # Simply inherit from VoiceoverScene instead of Scene to get all the
    # voiceover functionality.
    class RecorderExample(VoiceoverScene):
        def construct(self):
            # You can choose from a multitude of TTS services,
            # or in this example, record your own voice:
            self.set_speech_service(GTTSService())

            circle = Circle()

            # Surround animation sections with with-statements:
            with self.voiceover(text="This circle is drawn as I speak.") as tracker:
                self.play(Create(circle), run_time=tracker.duration)
                # The duration of the animation is received from the audio file
                # and passed to the tracker automatically.

            # This part will not start playing until the previous voiceover is finished.
            with self.voiceover(text="Let's shift it to the left 2 units.") as tracker:
                self.play(circle.animate.shift(2 * LEFT), run_time=tracker.duration)
            .....
    """

    model_response = llm.invoke([("system",str(sys_template)), ("user",str(q_prompt))]).content
    model_response = llm.invoke([("system","You are an AI assistant that helps in analyzing and correcting the provided maxim code to make sure it does not have the following problems:\n\n1) avoiding overlap of multiple texts\n2) missing componeents\n3) wrong calculations.4) making adjustments so that visualizations do not exactly represent represent the output, when the output is very large, short, small, big etc.. to visualize.\n\n Once done, provide me the entire code back to the user."+str(model_response))]).content
    model_response = llm.invoke([("system","Now add voice over to each and every step of the code based on the below example.\n\n"+voice_over_temp+"\n\n Now return the newer code with same functionality but with a clean voice over."),("user",model_response)]).content
    return model_response

# Function to save the generated code to a file
def save_code_to_file(class_name, code):
    filename = f"{class_name}.py"
    with open(filename, 'w') as file:
        file.write(code)
    return filename

# Function to activate the environment and run the Manim code
def run_manim_code(path1, class_name):
    activate_env = f"{path1}"
    manim_command = f"manim -pql {class_name}.py {class_name}"
    full_command = f"{activate_env} &&{manim_command}"
    os.system(full_command)

def extract_largest_code_block(text):
    # Find all Python code blocks
    code_blocks = re.findall(r'```python(.*?)```', text, re.DOTALL)
    if not code_blocks:
        return None
    # Return the largest block
    return max(code_blocks, key=len)
import re

def extract_class_names(code):
    # Regular expression to find class names
    class_pattern = re.compile(r'class\s+(\w+)\s*')
    # Find all class names
    class_names = class_pattern.findall(code)
    return class_names


# Main function
def main():
    # Prompt for DeepSeek to generate Manim code
    prompt = "generate a manim code for the following task: " + "a simple and intuitive way to understand integration of f(x) = x^2"

    # Generate the Manim code
    manim_code = generate_manim_code(prompt) # make the prev code as this function

    code_cleaned = extract_largest_code_block(manim_code)



    # Extract the class name from the generated code
    class_name = extract_class_names(code_cleaned)[0]  # You can parse this from the generated code if needed # make sure to use a regex to obtain it from the generated code

    # Save the generated code to a file
    save_code_to_file(class_name, code_cleaned)

    # Path to the virtual environment
    path1 = my_act_path # replace this with the path to your virtual environment of manim (uv based)

    # Run the Manim code
    run_manim_code(path1, class_name)

    return 


app = Flask(__name__)
CORS(app)


@app.route('/api/text', methods=['GET'])
def get_text(text):
    return jsonify({'text': 'Hello, World!'})

@app.route('/api/math', methods=['POST'])
def get_math():
    data = request.json
    vid_flag = data.get("vid",1)
    prompt = data.get("text")
    if vid_flag == 1:
        path = main(prompt)
        
        response = {"text": "Manim code generated successfully and video is being rendered. Please wait for a while."}
    else:
        response = ""## normal llm
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True,port=5000)