---
layout: default
title: {{ site.name }}
---

<script src="https://d3js.org/d3.v6.js"></script>
<script src="lib/bibtexParser.js"></script>
<script src="src/main.js"></script>

# Fairness in Networks, a tutorial

* Where: [KDD 2021](https://www.kdd.org/kdd2021/)
* When: TBD
* Who: [Sorelle Friedler](https://sorelle.friedler.net), [Carlos Scheidegger](https://cscheid.net), [Suresh Venkatasubramanian](http://www.cs.utah.edu/~suresh), [Aaron Clauset](https://www.colorado.edu/cs/aaron-clauset)
* What: [tutorial description, PDF format](full-version.pdf)

As ML systems have become more broadly adopted in high-stakes settings, so should our scrutiny of them. 
The field of _fairness_ in data mining and machine learning has blossomed in the last decade, but most of the attention has been directed at tabular and image data.  
In this tutorial, we will discuss recent advances in _network_ fairness.
Specifically, we focus on problems where one’s position in a network holds predictive value (e.g., in a classification or regression setting) and favorable network position can lead to a cascading loop of positive outcomes, leading to increased inequality.  
We start by reviewing important sociological notions such as social capital, information access and influence, as well as the now-standard definitions of fairness in an ML setting.  
We will discuss the formalizations of these concepts in the network fairness setting, presenting recent work in the field, and future directions.

## Repository

We'll host tutorial material on [this GitHub repo](https://github.com/algofairness/kdd-2021-network-fairness-tutorial).

# Outline

* Social Science, Fairness, and Networks (45 mins)
* Interactive Discussion + Exploration (40 mins + 15 min break)
* Information Access and Flow Mechanisms (15 mins)
* Recent Research on Fairness in Networks (45 mins)
* Future Directions (20 mins)


## Social Science, Fairness, and Networks (45 mins)

To introduce and motivate the overall tutorial from a social science perspective, we’ll begin by discussing boyd et al.'s paper on The Networked Nature of Algorithmic Discrimination \citep{boyd2014networked}.
This paper establishes the idea that fairness in networks is not just an allocation problem on a graph, but is about how social structures can create groups and patterns of inequality mediated by access.  One motivating example they describe, which we will also use for this tutorial, is that of a social network (such as LinkedIn) focused on access to job information, where who you know can directly determine whether you receive a job.  Thus, they argue, your social network connections (or lack thereof) can be used to discriminate against you.

This idea --- the possibility of discrimination based on social network position --- is the motivating theme for this tutorial.  The tutorial will begin by describing the social science rationale behind these concerns.

**What are networks and how they are created**. In order to understand how discrimination might manifest in social networks, we need to understand more about what these networks are and how they are created.  Social networks \citep{boyd2007social}, or networks where nodes represent individuals and edges represent connections between those people, exist in both online and offline settings.  These networks are known to exhibit *homophily* -- the tendency for people to be more likely to have ties (edges) in a social network if they share demographic characteristics and/or have common interests \citep{shalizi2011homophily}.  Thus, even without additional node attributes, networks can encode demographic information about individuals.  Additionally, and especially in online settings where links between people can sometimes be the results of recommendation algorithms, these connections between similar individuals become reinforced through a property known as *contagion*.

**Social capital in networks, the view from sociology**. 
Granovetter's seminal work on The Strength of Weak Ties introduced the idea that position in a network may determine an individual's access to resources and that such access may be based on meso-structures in a network beyond the scope of an individual's direct ties \citep{granovetter1973strength}.  In a job-focused social network, such weak ties between individuals who do not share other acquaintances, allow information about jobs to flow further through the network, letting individuals hear about jobs they might not otherwise know about.  This tangible importance of an individual's position in a network has been further developed in the notion of social capital.

*Social capital* is the idea that an individual's position in a network is a form of wealth, privilege, and power  \citep{burt2000network,coleman1988social}.  The idea of social capital has different nuanced results and implications.  *Contagion*, discussed earlier as well, is when individuals with social capital lead other individuals to copy their behavior.  *Network models of prominence* assume that social capital is an indication of quality or resources.  *Closure* is the related property where highly connected networks spread information widely, while *brokerage* is the ability of highly connected bridge nodes to have the social capital that comes from controlling access to information.

The tutorial will discuss these and related ideas from sociology so that participants can understand how social networks and fairness are connected.

**Social capital in networks, the view from CS**.
Increasingly, there has been empirical technical work demonstrating the importance of network position and social capital from within computer science and other technical fields.  Continuing with our running example about the way that social position in a network increases access to jobs, a line of work \citep{clauset2015systematic, morgan2018prestige, way2019productivity} has shown that the prestige of an institution based on its network position impacts the resulting prestige of PhD graduates, faculty productivity, and the spread of scientific ideas.  We will discuss this and other examples that demonstrate empirically how inequality manifests based on network position.

**What is fairness?  Disparate impact, error rate balance, individual fairness**.
Separate from the work on social networks, there is now a substantial amount of work on algorithmic fairness, with a focus on fairness in classification problems.  A basic review of some of the developed fairness definitions will be useful for tutorial participants to understand how fairness could be quantified.  Reviewed definitions will include disparate impact \citep{feldman2015certifying}, error rate balance \citep{hardt2016equality, zafar2017fairness}, and individual fairness \citep{dwork2012fairness}.

## Part 2: Interactive discussion and exploration (30 mins)

In breakout rooms of 5-10 people, we will have tutorial participants discuss the question of what fairness in networks should mean, and how it could be defined.  We will structure this via guided discussion questions around given case study scenarios.  One such example scenario follows.  Three such case studies will be distributed to the different breakout rooms, and groups will take notes on their outcomes in a Google Doc shared with the organizers.

    Suppose that you are developing algorithms that can be used by a job-related social network 
	such as LinkedIn to help recruiters determine who to target for job opportunities.
	Consider the following questions in your discussion groups:

    1. Who would the recruiters like to be able to reach with job opportunities?  How can they
	   be identified?
    2. What would it mean to allow recruiters to focus on equality of access in their outreach?
	   How can they be helped to do this?
    3. How could equality of access be formally defined in this case?
    4. What interventions is it possible for recruiters or the social network itself to do in 
	   order to increase equality of access?
    5. Are there other aspects of fairness in networks you think should be considered in this 
	   job-related network setting?

## 15 min break.

## Follow-up discussion / report back (10 mins)
The organizers will synthesize the outcomes from the discussion groups to report back some ideas about fairness in networks to the full group. The goal will be to prepare the audience to evaluate current research on fairness in networks and the extent to which it reflects their own thinking from the discussions. 


## Information Access and Flow Mechanisms (15 mins)

We will start the second part of the tutorial with a brief introduction to the models used to capture
the flow of information in a (social) network. In keeping with the translational
spirit of this tutorial, we will emphasize the different ways in which similar
mechanisms for propagation are described in different communities.

We will start with the basic independent cascade model (where information is
transmitted by a node to any given neighbor with a fixed probability, and after
which the node does not transmit again), and follow this with the (linear) threshold
model (where a node that receives sufficiently many signals from neighbors
transmits information outward). We will relate these to the notions of simple
and complex cascades in networks, as well as the different models for
information flow used in epidemiology (pointing out the connection between
independent cascades and SIR for example).

We will also briefly cover generalizations of these basic models that are
pertinent to information flow, such as the models where nodes are more or less
likely to transmit or be persuaded about information based on node-specific
characteristics \citep{aral2018social,aral2012identifying}.


## Recent Research on Fairness in Networks (45 mins)

Armed with this mathematical framework, we will dive into a presentation of research on fairness in networks. We will start with a discussion of *access* as the quantity that needs to be equitably distributed. Access in a network has typically been measured as some utility function of the probability of receiving information via a flow mechanism such as above. We will discuss the different utility functions that have been proposed in the literature. 

**Equity**. Following this, we will review the axiomatic frameworks used to decide what it means for access to be equitable. Different works have proposed different principled arguments for deriving different measures of equity, such as preventing rich from getting richer, or ensuring that the least advantaged gain access (a Rawlsian maximin argument for example). We will briefly discuss concepts from welfare theory that are used in some works. The papers that we will cover here include those by 
\cite{tsang}, \cite{fish} and \cite{rahmattalabi}.

These papers also represent two different frames for thinking about equity: a more "individually focused" version exemplified by \cite{fish} and one focused on equity for groups illustrated by \cite{tsang} and \cite{rahmattalabi}. We will highlight the tensions between these perspectives.

**Dynamics**. Measures of equitable access can also be used to shed light on inequities in existing networks as well as be used to monitor how social phenomenon (through biases in attachment or recommendations) might increase bias in networks. We will introduce the audience to research that seeks to explore this in the context of gender discrimination \citep{stoica18} by suggesting mechanisms that lead to increased inequity, as well as in more general contexts with majority and minority groups \citep{augustin21}. This part of the tutorial will connect back with the work described above on the CS view of social capital: indeed, the work described here can be viewed as attempting to mathematically model empirically observed patterns of bias and thus provide a framework for interventions. 

**Interventions**. If we recognize that patterns of inequity manifest in a social network and that there are ways to measure it, how might we rectify this with interventions? In the world of influence maximization, interventions correspond to *seeding* a network with carefully chosen nodes to improve access. We will review algorithms in the works above to intervene to optimize for fair access. The underlying algorithmic questions turn out to be much harder in general, not always admitting close-to-optimal solutions via submodular maximization except in special cases \citep{fish,tsang,rahmattalabi,ali2019fairness,10.1145/3366424.3383555}. We will also review work \citep{stoica20} that seeks to design models for network formation that admit more efficient interventions that are both effective and fair under appropriate definitions of equity. 

## Future Directions (20 mins)
We will close with a group discussion of suggested future directions for exploration of this field. As prompts, we will encourage the participants to reflect on their interactive activity and how the questions they posed there are addressed (or not) by current research efforts.

# References

<pre id="refs">
@article{boyd2014networked,
  title={The networked nature of algorithmic discrimination},
  author={boyd, danah and Levy, Karen and Marwick, Alice},
  journal={Data and Discrimination: Collected Essays. Open Technology Institute},
  year={2014}
}

@article{burt2000network,
  title={The network structure of social capital},
  author={Burt, Ronald S},
  journal={Research in organizational behavior},
  volume={22},
  pages={345--423},
  year={2000},
  publisher={Elsevier}
}

@inproceedings{dwork2012fairness,
  title={Fairness through awareness},
  author={Dwork, Cynthia and Hardt, Moritz and Pitassi, Toniann and Reingold, Omer and Zemel, Richard},
  booktitle={Proceedings of the 3rd innovations in theoretical computer science conference},
  pages={214--226},
  year={2012}
}

@inproceedings{zafar2017fairness,
  title={Fairness beyond disparate treatment \& disparate impact: Learning classification without disparate mistreatment},
  author={Zafar, Muhammad Bilal and Valera, Isabel and Gomez Rodriguez, Manuel and Gummadi, Krishna P},
  booktitle={Proceedings of the 26th international conference on world wide web},
  pages={1171--1180},
  year={2017}
}

@inproceedings{hardt2016equality,
  title={Equality of Opportunity in Supervised Learning},
  author={Hardt, Moritz and Price, Eric and Srebro, Nati},
  booktitle={NeurIPS},
  year={2016}
}

@inproceedings{feldman2015certifying,
  title={Certifying and removing disparate impact},
  author={Feldman, Michael and Friedler, Sorelle A and Moeller, John and Scheidegger, Carlos and Venkatasubramanian, Suresh},
  booktitle={proceedings of the 21th ACM SIGKDD international conference on knowledge discovery and data mining},
  pages={259--268},
  year={2015}
}

@inproceedings{friedler2019comparative,
  title={A comparative study of fairness-enhancing interventions in machine learning},
  author={Friedler, Sorelle A and Scheidegger, Carlos and Venkatasubramanian, Suresh and Choudhary, Sonam and Hamilton, Evan P and Roth, Derek},
  booktitle={Proceedings of the conference on fairness, accountability, and transparency},
  pages={329--338},
  year={2019}
}

@article{clauset2015systematic,
  title={Systematic inequality and hierarchy in faculty hiring networks},
  author={Clauset, Aaron and Arbesman, Samuel and Larremore, Daniel B},
  journal={Science advances},
  volume={1},
  number={1},
  pages={e1400005},
  year={2015},
  publisher={American Association for the Advancement of Science}
}

@article{morgan2018prestige,
  title={Prestige drives epistemic inequality in the diffusion of scientific ideas},
  author={Morgan, Allison C and Economou, Dimitrios J and Way, Samuel F and Clauset, Aaron},
  journal={EPJ Data Science},
  volume={7},
  number={1},
  pages={40},
  year={2018},
  publisher={Springer Berlin Heidelberg}
}

@article{boyd2007social,
  title={Social network sites: Definition, history, and scholarship},
  author={boyd, danah and Ellison, Nicole B},
  journal={Journal of computer-mediated Communication},
  volume={13},
  number={1},
  pages={210--230},
  year={2007},
  publisher={Wiley Online Library}
}

@article{way2019productivity,
  title={Productivity, prominence, and the effects of academic environment},
  author={Way, Samuel F and Morgan, Allison C and Larremore, Daniel B and Clauset, Aaron},
  journal={Proceedings of the National Academy of Sciences},
  volume={116},
  number={22},
  pages={10729--10733},
  year={2019},
  publisher={National Acad Sciences}
}

@inproceedings{fish2019gaps,
  title={Gaps in Information Access in Social Networks},
  author={Fish, Benjamin and Bashardoust, Ashkan and boyd, danah and Friedler, Sorelle and Scheidegger, Carlos and Venkatasubramanian, Suresh},
  booktitle={The World Wide Web Conference},
  pages={480--490},
  year={2019}
}

@article{granovetter1973strength,
  title={The strength of weak ties},
  author={Granovetter, Mark S},
  journal={American journal of sociology},
  volume={78},
  number={6},
  pages={1360--1380},
  year={1973},
  publisher={University of Chicago Press}
}

@article{shalizi2011homophily,
  title={Homophily and contagion are generically confounded in observational social network studies},
  author={Shalizi, Cosma Rohilla and Thomas, Andrew C},
  journal={Sociological methods \& research},
  volume={40},
  number={2},
  pages={211--239},
  year={2011},
  publisher={Sage Publications Sage CA: Los Angeles, CA}
}

@inproceedings{tsang,
  title     = {Group-Fairness in Influence Maximization},
  author    = {Tsang, Alan and Wilder, Bryan and Rice, Eric and Tambe, Milind and Zick, Yair},
  booktitle = {Proceedings of the Twenty-Eighth International Joint Conference on
               Artificial Intelligence, {IJCAI-19}},
  publisher = {International Joint Conferences on Artificial Intelligence Organization},             
  pages     = {5997--6005},
  year      = {2019},
  month     = {7},
  doi       = {10.24963/ijcai.2019/831},
  url       = {https://doi.org/10.24963/ijcai.2019/831},
}
@inproceedings{stoica18,
author = {Stoica, Ana-Andreea and Riederer, Christopher and Chaintreau, Augustin},
title = {Algorithmic Glass Ceiling in Social Networks: The Effects of Social Recommendations on Network Diversity},
year = {2018},
isbn = {9781450356398},
publisher = {International World Wide Web Conferences Steering Committee},
address = {Republic and Canton of Geneva, CHE},
url = {https://doi.org/10.1145/3178876.3186140},
doi = {10.1145/3178876.3186140},
abstract = {As social recommendations such as friend suggestions and people to follow become increasingly popular and influential on the growth of social media, we find that prominent social recommendation algorithms can exacerbate the under-representation of certain demographic groups at the top of the social hierarchy. To study this imbalance in online equal opportunities, we leverage new Instagram data and offer for the first time an analysis that studies the effect of gender, homophily and growth dynamics under social recommendations. Our mathematical analysis demonstrates the existence of an algorithmic glass ceiling that exhibits all the properties of the metaphorical social barrier that hinders groups like women or people of color from attaining equal representation. What raises concern is that our proof shows that under fixed minority and homophily parameters the algorithmic effect is systematically larger than the glass ceiling generated by the spontaneous growth of social networks. We discuss ways to address this concern in future design.},
booktitle = {Proceedings of the 2018 World Wide Web Conference},
pages = {923–932},
numpages = {10},
keywords = {random walks, homophily, fairness, social recommender},
location = {Lyon, France},
series = {WWW '18}
}

@article{rahmattalabi,
  author    = {Aida Rahmattalabi and
               Shahin Jabbari and
               Himabindu Lakkaraju and
               Phebe Vayanos and
               Eric Rice and
               Milind Tambe},
  title     = {Fair Influence Maximization: {A} Welfare Optimization Approach},
  journal   = {CoRR},
  volume    = {abs/2006.07906},
  year      = {2020},
  url       = {https://arxiv.org/abs/2006.07906},
  archivePrefix = {arXiv},
  eprint    = {2006.07906},
  timestamp = {Wed, 17 Jun 2020 14:28:54 +0200},
  biburl    = {https://dblp.org/rec/journals/corr/abs-2006-07906.bib},
  bibsource = {dblp computer science bibliography, https://dblp.org}
}

@inproceedings{fish,
author = {Fish, Benjamin and Bashardoust, Ashkan and Boyd, Danah and Friedler, Sorelle and Scheidegger, Carlos and Venkatasubramanian, Suresh},
title = {Gaps in Information Access in Social Networks},
year = 2019,
isbn = 9781450366748,
publisher = {Association for Computing Machinery},
address = {New York, NY, USA},
url = {https://doi.org/10.1145/3308558.3313680},
doi = {10.1145/3308558.3313680},
abstract = {The study of influence maximization in social networks has largely ignored disparate effects these algorithms might have on the individuals contained in the social network. Individuals may place a high value on receiving information, e.g. job openings or advertisements for loans. While well-connected individuals at the center of the network are likely to receive the information that is being distributed through the network, poorly connected individuals are systematically less likely to receive the information, producing a gap in access to the information between individuals. In this work, we study how best to spread information in a social network while minimizing this access gap. We propose to use the maximin social welfare function as an objective function, where we maximize the minimum probability of receiving the information under an intervention. We prove that in this setting this welfare function constrains the access gap whereas maximizing the expected number of nodes reached does not. We also investigate the difficulties of using the maximin, and present hardness results and analysis for standard greedy strategies. Finally, we investigate practical ways of optimizing for the maximin, and give empirical evidence that a simple greedy-based strategy works well in practice. },
booktitle = {The World Wide Web Conference},
pages = {480–490},
numpages = 11,
keywords = {social networks, influence maximization, fairness},
location = {San Francisco, CA, USA},
series = {WWW '19}
}


@article{ali2019fairness,
  title={On the fairness of time-critical influence maximization in social networks},
  author={Ali, Junaid and Babaei, Mahmoudreza and Chakraborty, Abhijnan and Mirzasoleiman, Baharan and Gummadi, Krishna P and Singla, Adish},
  journal={arXiv preprint arXiv:1905.06618},
  year={2019}
}

@article{augustin21,
  title={Chasm in Hegemony: Explaining and Reproducing Disparities in Homophilous Networks},
  author={Zhang, Yiguang and Han, Jessy Xinyi and Mahajan, Ilica and Bengani, Priyanjana and Chaintreau, Augustin},
  journal={arXiv preprint arXiv:2102.11925},
  year={2021}
}

@inproceedings{stoica20,
author = {Stoica, Ana-Andreea and Han, Jessy Xinyi and Chaintreau, Augustin},
title = {Seeding Network Influence in Biased Networks and the Benefits of Diversity},
year = {2020},
isbn = {9781450370233},
publisher = {Association for Computing Machinery},
address = {New York, NY, USA},
url = {https://doi.org/10.1145/3366423.3380275},
doi = {10.1145/3366423.3380275},
abstract = {The problem of social influence maximization is widely applicable in designing viral campaigns, news dissemination, or medical aid. State-of-the-art algorithms often select “early adopters” that are most central in a network unfortunately mirroring or exacerbating historical biases and leaving under-represented communities out of the loop. Through a theoretical model of biased networks, we characterize the intricate relationship between diversity and efficiency, which sometimes may be at odds but may also reinforce each other. Most importantly, we find a mathematically proven analytical condition under which more equitable choices of early adopters lead simultaneously to fairer outcomes and larger outreach. Analysis of data on the DBLP network confirms that our condition is often met in real networks. We design and test a set of algorithms leveraging the network structure to optimize the diffusion of a message while avoiding to create disparate impact among participants based on their demographics, such as gender or race.},
booktitle = {Proceedings of The Web Conference 2020},
pages = {2089–2098},
numpages = {10},
keywords = {influence, graph algorithms, social networks, fairness},
location = {Taipei, Taiwan},
series = {WWW '20}
}

@inproceedings{10.1145/3366424.3383555,
author = {Farnad, Golnoosh and Babaki, Behrouz and Gendreau, Michel},
title = {A Unifying Framework for Fairness-Aware Influence Maximization},
year = {2020},
isbn = {9781450370240},
publisher = {Association for Computing Machinery},
address = {New York, NY, USA},
url = {https://doi.org/10.1145/3366424.3383555},
doi = {10.1145/3366424.3383555},
abstract = {The problem of selecting a subset of nodes with greatest influence in a graph, commonly known as influence maximization, has been well studied over the past decade. This problem has real world applications which can potentially affect lives of individuals. Algorithmic decision making in such domains raises concerns about their societal implications. One of these concerns, which surprisingly has only received limited attention so far, is algorithmic bias and fairness. We propose a flexible framework that extends and unifies the existing works in fairness-aware influence maximization. This framework is based on an integer programming formulation of the influence maximization problem. The fairness requirements are enforced by adding linear constraints or modifying the objective function. Contrary to the previous work which designs specific algorithms for each variant, we develop a formalism which is general enough for specifying different notions of fairness. A problem defined in this formalism can be then solved using efficient mixed integer programming solvers. The experimental evaluation indicates that our framework not only is general but also is competitive with existing algorithms. },
booktitle = {Companion Proceedings of the Web Conference 2020},
pages = {714–722},
numpages = {9},
keywords = {Group Fairness, Influence Maximization, Mixed Integer Programming},
location = {Taipei, Taiwan},
series = {WWW '20}
}

@article{aral2018social,
  title={Social influence maximization under empirical influence models},
  author={Aral, Sinan and Dhillon, Paramveer S},
  journal={Nature human behaviour},
  volume={2},
  number={6},
  pages={375--382},
  year={2018},
  publisher={Nature Publishing Group}
}

@article{aral2012identifying,
  title={Identifying influential and susceptible members of social networks},
  author={Aral, Sinan and Walker, Dylan},
  journal={Science},
  volume={337},
  number={6092},
  pages={337--341},
  year={2012},
  publisher={American Association for the Advancement of Science}
}

@article{coleman1988social,
  title={Social capital in the creation of human capital},
  author={Coleman, James S},
  journal={American journal of sociology},
  volume={94},
  pages={S95--S120},
  year={1988},
  publisher={University of Chicago Press}
}>
</pre>
<ul id="refslist"></ul>
