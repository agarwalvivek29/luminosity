import os
import asyncio
from utils import Utils

class Electronics:
    def __init__(self, name):
        self.name = name

    async def verilog_execution(self, module: str, module_content, testbench: str):
        # Write code to files
        modulepath = f"./uploads/{module}.v"
        testbenchpath = f"./uploads/{module}_tb.v"
        outputpath = f"./uploads/{module}.out"
        simulationpath = f"./uploads/{module}.vcd"
        yoysyspath = f"./uploads/{module}.json"
        rtlviewpath = f"./uploads/{module}.svg"

        errors = []

        with open(modulepath, "w") as file:
            file.write(module_content)
        with open(testbenchpath, "w") as file:
            file.write(testbench)

        # Run Icarus Verilog
        process = await asyncio.create_subprocess_exec(
            "iverilog", "-o", outputpath, modulepath, testbenchpath,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
        stdout, stderr = await process.communicate()
        if stderr:
            errors.append(stderr.decode())
        output = stdout.decode()

        simulation = None
        rtlview = None

        # Upload Simulation Results
        if os.path.exists(simulationpath):
            utils = Utils()
            object_name = f"{module}.vcd"
            file_path = f"{os.getcwd()}/uploads/{module}.vcd"
            simulation = await utils.save_to_github(file_path, object_name)     

        # Create RTL View and Upload
        process = await asyncio.create_subprocess_exec(
            "yoysys", "-p", f'"read_verilog {modulepath}; proc; opt; write_json {yoysyspath}"', "&&", "netlistsvg", f"{yoysyspath}", "-o", f"{rtlviewpath}",
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
        stdout, stderr = await process.communicate()
        if stderr:
            errors.append(stderr.decode())
        
        if os.path.exists(f"{module}.svg"):
            object_name = f"{module}.svg"
            file_path = f"{os.getcwd()}/{module}.svg"
            rtlview = await utils.upload_to_s3(file_path, object_name, 'image/svg+xml')
            if not rtlview:
                errors.append("Failed to upload RTL View to S3")

        return {
            "success": True,
            "message": output,
            "simulation": simulation,
            "rtlview": rtlview,
            "errors": errors
        }