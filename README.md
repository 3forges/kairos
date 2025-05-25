# Kairos

To deploy Kairos you will need at least one machine with:
* 4 CPUs
* 10 GB of RAM,
* also 100GB hard disk
* a GNU/Linux, a debian 12 is recommended
* Docker, and docker compose installed

Once the deployment of kairos is done, you do not need any connection to the internet for it to work, and you will have:

* A React frontend, 
* A FastAPI REST API
* A Postgres Database
* A Whisper AI service

And in the React frontend, you an pres a microphone button, speak, and the private Whisper AI will trasncribe to text what you say.

It WILL work with only 4 CPU, no GPU, and 10 GB of RAM, but the whisper AI will be slow, very slow.

So for a production deployement, you will need more CPU, and espcially you will need GPUs. See technical details for that.

Never the less, the point of this first realease, is to give you a fully private Whisper Service ACTUALLY working, with a decent react frontend.

Enjoy.

## Deploy first

### Configure

You can then update configs in the `.env` files to customize your configurations.

Before deploying it, make sure you change at least the values for:

- `SECRET_KEY`
- `FIRST_SUPERUSER_PASSWORD`
- `POSTGRES_PASSWORD`

You can (and should) pass these as environment variables from secrets.

Read the [deployment.md](./deployment.md) docs for more details.

## Special Thanks

This frist release was created starting from the `0.8.0` release of the awesome <https://github.com/fastapi/full-stack-fastapi-template>

<!--
## Why Kairos

### Kairos use cases

Kairos is a platform anyone can use to gather contributions to a global project.

In a company or organization, where a team wants to gather contributions, ideas, suggestions from an audience.

For example, an NGO could use Kairos to gather ideas, suggestions, from its members:

* about how a project should be implemented,
* or what organizations changes should be realized. Maye for example preparing a change to the NGO legal status.

Kairos is typically useful for such gathering, over limited periods in time:

* During 6 months, ideas are gathered to prepare 2 or 3 proposals of change in the legal status of an NGO, and after 6 months, the members of the organizations vote to choose one among the 2 or 3  proposals.
* Other examples will be given in the near future.

### How Kairos makes a difference ?

So, what's the difference with other solutions enabling organizations to gather ideas/proposals/contributions ?

The difference is that the data belongs to those who gie their ideas, proposals, contributions.

How does Kairos achieves that?

To begin with, Kairos brings actual full sovereignity: You can run kairos on your own servers, fully. But that is not enough.

Indeed, say 10 000 people decide to work together and gather ideas, to reach a goal (a project, a change of legal status, etc..):

When you provision kairos for the first time:

* You invite all of the people of your organizations in a meeting, like a general assembly. If your organizations has 10 000 people, it might be too hard to organize a meeting for 10 000 people, so you will:
  * group the people of your organizations in groups of 50 people,
  * ask each group to choose one or 2 person(s) to represent them in the general assembly.
* You will end up in an assembly of less than 400 people.
* Each person in the gathered assembly, will be given one piece of paper, and will write his/her name on the paper.
* All of the papers will be put in a box. The box is shooked, to mix all of the papers, and one person will draw 13 papers from the box, in front of the eyes of all.
* The 13 people will receive 13 keys, that they have the responsibility to hold secret to theirs only.

When the 13 people have been randomly chosen, the KAiros provisioning process last step, will be performed in front of the eyes of every one, ending in printing the 13 keys, on 13 papers, each given to one of the 13 randomly chosen people.

Now, in Kairos, it is impossible to delete, or modify any data int he database, unless at least 11 persons among the 13, bring their keys in person.

Kairos cn be configured so that it is up to 256 keys, and and at least N keys (N<255) are required to modify or delete any data.

Usual super admin can quey the data, and work with it, to the service of the people of their organization, in any way they like, but they cannot modify, of delete any data, without the global consent of the organization.

They process of choosing those "13 key holders", must be based on random drawing from a box in an assembly, this is essential for you people, to be able to make sure you keep control over the data.

Note that the number of key holders (above 13 in example), must be both:
* random
* and "high enough", 

Such that it would make really hard, for anyone to try and corrupt the data without your consent, to get contorl over enough key holders, to be able to gain control over  your data.

Let's give an example:

* If you are 10 000, then we would advise you have at least 64 secret key holders, and at least 48 are required to be allowed to delete , or modify, any data.
* Then imagine how hard it would be, for anyone, to corrupt 48 people randomly chosen among the 10 000 of you.
* This is why we would strongly advise that the people going to the assembly, ae also randomly picked in each smmal group of 50 people: this makes it impossible for anyone, to predict or influence **_who_** are going to be the key holders.

-->