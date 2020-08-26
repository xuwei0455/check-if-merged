import * as core from '@actions/core'
import {CheckIfMergedWorkflow} from './CheckIfMergedWorkflow'

// import * as exec from '@actions/exec'

async function run(): Promise<void> {
  try {
    // const destinationBranch: string = core.getInput('destination_branch', {
    //   required: true
    // })

    const sourceBranch: string = core.getInput('source_branch', {
      required: true
    })

    const token: string = core.getInput('token', {
      required: true
    })

    // TODO: pick owner and repo from somewhere
    const c = new CheckIfMergedWorkflow({
      owner: 'CareMessagePlatform',
      repo: 'CareMessage',
      token,
      branch: sourceBranch
    })

    await c.reRun()

    core.setOutput('is_merged', '0')
  } catch (error) {
    core.setOutput('is_merged', '100')
    core.setFailed(error.message)
  }
}

run()
