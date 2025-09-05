import { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(true);
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);
  const [isOpen4, setIsOpen4] = useState(true);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen min-w-screen">
      <div className="flex flex-1 flex-col items-center justify-center w-full px-20 text-center">
        <h1 className="text-4xl font-bold">Dennis AWS Journey</h1>
        <h3 className="text-xl">
          I got no idea what to put on this website so I decided to just write
          up my journey of what I learned
        </h3>
      </div>
      <div className="flex flex-col flex-7 w-full justify-start items-start">
        <div className="flex flex-col flex-7 w-full justify-start items-start cursor-pointer">
          <h2 className="text-2xl font-bold mb-5 mt-5">
            Chapter 1: Hosting a website on a EC2 instance
          </h2>

          <div onClick={() => setIsOpen(!isOpen)}>
            <h3 className="text-2xl font-bold mb-1 mt-2">
              1. Create the instance
            </h3>
            {isOpen && (
              <>
                <p className="ml-3 text-xl">
                  Setting it up was quite easy everything is done through the
                  AWS console but also here was my first mistake as I would
                  later find out
                </p>
                <p className="ml-3 text-xl">
                  Set up the Instance watch it spin up. Nothing special all
                  worked as intended
                </p>
              </>
            )}
          </div>
          <div onClick={() => setIsOpen1(!isOpen1)}>
            <h3 className="text-2xl font-bold mb-1 mt-2">
              2. Connect to the instance
            </h3>
            {isOpen1 && (
              <>
                <p className="ml-3 text-xl">
                  Now how do I connect to the instance? The connect option gave
                  me 4 options out of which all 4 didnt work
                </p>
                <p className="ml-3 text-xl">
                  So I tried the SSH client which didnt work I got no response
                </p>
                <p className="ml-3 text-xl">
                  First lesson on instances - they run on a private network so I
                  got no access to it from outside.
                </p>
                <p className="ml-3 text-xl">
                  Then I tried the Session manager. This didnt work and as the
                  internet would reveal its because IAM Role wasnt set up
                  correctly. So we spin down the instance and check what the
                  hell an IAM role is.
                </p>
                <p className="ml-3 text-xl">
                  Apparently its the access the instance has to other AWS
                  servies which the Session manager seems to be apart of. So i
                  created a new one and assigned it to the instance spin it back
                  up just to see it still now working
                </p>
                <p className="ml-3 text-xl">
                  So 2/4 options dont work so i got to the next two. Next the
                  ec2 serial console. Well didnt work as it asked me for a
                  password for the user which i didnt have. So where do i get
                  the password from i asked chatgpt which answered that i need
                  to SSH into the instance. Well this wont fly
                </p>
                <p className="ml-3 text-xl">
                  Last option is the EC2 Instance Connect. This one seemed
                  promising as it allows you to connect to your instance without
                  needing a password. However, it turns out my instance type
                  doesn't support it. So here I am, back to square one.
                </p>
                <p className="ml-3 text-xl">
                  So it seems i need a public ip for the instance. First set up
                  a Elastic IP. What is an elastic ip? An Elastic IP (EIP) in
                  AWS is a static public IPv4 address that you can allocate to
                  your AWS account and associate with an EC2 instance or network
                  interface.
                </p>
                <p className="ml-3 text-xl">
                  Doesnt say much for now but i needed one. So i assigned it to
                  the instance (hopefully not taking anyones or breaking
                  anything else)
                </p>
                <p className="ml-3 text-xl">
                  Now i go a public ip but then i needed to add rules to prevent
                  anyone accessing the instance from outside.
                </p>
                <p className="ml-3 text-xl">
                  So i went to the security group setting and added a rule which
                  only allowed me to access the instance
                </p>
                <p className="ml-3 text-xl">
                  Now i can finally connect to my instance and host my page
                  right? Wrong! It still doesnt have access to the internet
                </p>
                <p className="ml-3 text-xl">
                  So i went to the VPC settings and needed a NAT Gateway. A NAT
                  Gateway allows instances in a private subnet to connect to the
                  internet while preventing inbound traffic from the internet.
                </p>
                <p className="ml-3 text-xl">
                  Luckily i found a VPC with a public subnet and a NAT Gateway
                  but i didnt know how to change it. So i deleted the old
                  instance and created a new one where i selected the VPC from
                  the start.
                </p>
                <p className="ml-3 text-xl">
                  Turns out this VPC was wrong. A VPC includes subnets (to place
                  your instance), route tables (to direct traffic), and an
                  internet gateway (to allow internet access). These define
                  where the instance runs, how it connects, and how it
                  communicates externally. I choose the wrong VPC.
                </p>
                <p className="ml-3 text-xl">
                  So i choose another one and this worked (shoutout Sebastian)
                </p>
                <p className="ml-3 text-xl">
                  Back at square one with a VPC set up i went through the steps
                  above again
                </p>
                <p className="ml-3 text-xl">
                  Now i opened the terminal and finally I was in the instance!
                </p>
                <p className="ml-3 text-xl">
                  From here its easy set up npm and node, clone the repo and
                  build it. And it worked
                </p>

                <h4 className="text-l font-bold ml-3">Takeaways</h4>
                <ul>
                  <li className="ml-3 text-xl">
                    What is a VPC and how can i create one myself?
                  </li>
                  <li className="ml-3 text-xl">
                    What other permissions are there in IAM roles?
                  </li>
                  <li className="ml-3 text-xl">What is a subnet?</li>
                  <li className="ml-3 text-xl">
                    What is the difference between a public and private subnet?
                  </li>
                  <li className="ml-3 text-xl">What is a route table?</li>
                  <li className="ml-3 text-xl">
                    How would access be restricted in a production setting?
                  </li>
                </ul>
              </>
            )}
          </div>
          <div onClick={() => setIsOpen2(!isOpen2)}>
            <h3 className="text-2xl font-bold mb-1 mt-2">
              3. Setting up a Github actions pipeline to create new builds
            </h3>
            {isOpen2 && (
              <>
                <p className="ml-3 text-xl">
                  So next up was setting up a pipeline. Why you ask? No clue it
                  sounded cool thats why.
                </p>
                <p className="ml-3 text-xl">
                  What are Github action runners? They are VMs that run the
                  command set in a yaml file in the .github/workflows folder
                </p>
                <p className="ml-3 text-xl">
                  From my understanding they can basically do anything you want
                  them to do as long as you know the commands. So we set up a
                  simple pipeline. It should use the keys to ssh into the
                  instance and then pull the changes on the main branch, install
                  the dependencies and run a new build. Simple enough
                </p>
                <p className="ml-3 text-xl">
                  Set up the environment with the host name, the ip and a
                  private key. Created a key pair. Private key goes to github
                  secrets, public key goes to the instance. This way the VM can
                  authenticate itself when trying to ssh into the instance.
                </p>
                <p className="ml-3 text-xl">
                  Now it worked it got the right secrets to access. But the
                  Instance refused to connect. Think back to the inbound
                  security rules. The instance refuses connections which arent
                  from my connection. The github runner has a different ip. So i
                  changed the inbound rule temporarly to allow all connections.
                </p>
                <p className="ml-3 text-xl">
                  Now it ran but ran it but the npm install failed? It was at
                  the wrong directory. The github actions runner was in the root
                  directory which is not where the project is. So added a new
                  command to cd into the project.
                </p>
                <p className="ml-3 text-xl">
                  Ran it again and now it worked. But the page didnt change?
                  Why? Because I forgot to actually build the project. So added
                  a new command to run the build script. Now it should work
                </p>
                <p className="ml-3 text-xl">
                  And it worked. After what felt like 100 github runners running
                  for their dear life and failing it worked. Now still need to
                  resolve the issue that i cant run it because if the inbound
                  rules. Fixing it would require my workflow changing the
                  permissions then running then setting them back.
                </p>
                <p className="ml-3 text-xl">
                  And thats what I did. But it didnt work. I couldnt change the
                  permissions to get the ID and Key as I dont have them. And I
                  couldnt create a new user as i dont have the permissions to do
                  so. So this chapter ends here for now.
                </p>
                <p className="ml-3 text-xl">
                  Roles vs users. A user is an individual identity with specific
                  permissions, while a role is a set of permissions that can be
                  assumed by users or services to perform specific tasks without
                  needing permanent
                </p>
              </>
            )}
          </div>
          <div onClick={() => setIsOpen4(!isOpen4)}>
            <h3 className="text-2xl font-bold mb-1 mt-2">
              4. Extending the pipeline with docker
            </h3>
            {isOpen4 && (
              <>
                <p className="ml-3 text-xl">
                  Now we set up docker because I never actually used it before.
                  Creating the docker image was easy enough. Also setting up the
                  pipeline was easy as well now that i got a better
                  understanding of how this actually works
                </p>
                <p className="ml-3 text-xl">
                  But what i gained the most from this is why do we use docker.
                  it makes it so much easier to deploy the app before i was spin
                  the instance then install npm, node and all that then clone
                  the repo then run it. With docker its just get the image and
                  run all is taken care of as the pipeline creates a new image
                  on commits to main and uploads them and from then its just
                  plug and play
                </p>
                <p className="ml-3 text-xl">
                  This reminded me of what i read: "To see whats missing you
                  need to be at the bleeding edge of technology" and this makes
                  so much sense why they created docker. it bundles all these
                  steps into one and makes it so much easier. I had an ephinany
                  moment here on docker!
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
