---
layout: default
title: {{ site.name }}
---

# Fairness in Networks, a tutorial

* Where: [KDD 2021](https://www.kdd.org/kdd2021/)
* When: TBD
* Who: [Sorelle Friedler](https://sorelle.friedler.net), [Carlos Scheidegger](https://cscheid.net), [Suresh Venkatasubramanian](http://www.cs.utah.edu/~suresh)

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

To introduce and motivate the overall tutorial from a social science perspective, we’ll begin by discussing [boyd et al.'s paper on The Networked Nature of Algorithmic Discrimination][1]. 
This paper establishes the idea that fairness in networks is not just an allocation problem on a graph, but is about how social structures can create groups and patterns of inequality mediated by access.  One motivating example they describe, which we will also use for this tutorial, is that of a social network (such as LinkedIn) focused on access to job information, where who you know can directly determine whether you receive a job.  Thus, they argue, your social network connections (or lack thereof) can be used to discriminate against you.

This idea --- the possibility of discrimination based on social network position --- is the motivating theme for this tutorial.  The tutorial will begin by describing the social science rationale behind these concerns.

**What are networks and how they are created.** In order to understand how discrimination might manifest in social networks, we need to understand more about what these networks are and how they are created.  Social networks \citep{boyd2007social}, or networks where nodes represent individuals and edges represent connections between those people, exist in both online and offline settings.  These networks are known to exhibit \emph{homophily} -- the tendency for people to be more likely to have ties (edges) in a social network if they share demographic characteristics and/or have common interests \citep{shalizi2011homophily}.  Thus, even without additional node attributes, networks can encode demographic information about individuals.  Additionally, and especially in online settings where links between people can sometimes be the results of recommendation algorithms, these connections between similar individuals become reinforced through a property known as \emph{contagion}.

**Social capital in networks, the view from sociology**
Granovetter's seminal work on The Strength of Weak Ties introduced the idea that position in a network may determine an individual's access to resources and that such access may be based on meso-structures in a network beyond the scope of an individual's direct ties \citep{granovetter1973strength}.  In a job-focused social network, such weak ties between individuals who do not share other acquaintances, allow information about jobs to flow further through the network, letting individuals hear about jobs they might not otherwise know about.  This tangible importance of an individual's position in a network has been further developed in the notion of social capital.

\emph{Social capital} is the idea that an individual's position in a network is a form of wealth, privilege, ad power \citep{burt2000network,coleman1988social}.  The idea of social capital has different nuanced results and implications.  \emph{Contagion}, discussed earlier as well, is when individuals with social capital lead other individuals to copy their behavior.  \emph{Network models of prominence} assume that social capital is an indication of quality or resources.  \emph{Closure} is the related property where highly connected networks spread information widely, while \emph{brokerage} is the ability of highly connected bridge nodes to have the social capital that comes from controlling access to information.

The tutorial will discuss these and related ideas from sociology so that participants can understand how social networks and fairness are connected.

**Social capital in networks, the view from CS**
Increasingly, there has been empirical technical work demonstrating the importance of network position and social capital from within computer science and other technical fields.  Continuing with our running example about the way that social position in a network increases access to jobs, a line of work \citep{clauset2015systematic, morgan2018prestige, way2019productivity} has shown that the prestige of an institution based on its network position impacts the resulting prestige of PhD graduates, faculty productivity, and the spread of scientific ideas.  We will discuss this and other examples that demonstrate empirically how inequality manifests based on network position.

**What is fairness?  Disparate impact, error rate balance, individual fairness**
Separate from the work on social networks, there is now a substantial amount of work on algorithmic fairness, with a focus on fairness in classification problems.  A basic review of some of the developed fairness definitions will be useful for tutorial participants to understand how fairness could be quantified.  Reviewed definitions will include disparate impact \citep{feldman2015certifying}, error rate balance \citep{hardt2016equality, zafar2017fairness}, and individual fairness \citep{dwork2012fairness}.

**Part 2: Interactive discussion and exploration (30 mins)**
In breakout rooms of 5-10 people, we will have tutorial participants discuss the question of what fairness in networks should mean, and how it could be defined.  We will structure this via guided discussion questions around given case study scenarios.  One such example scenario follows.  Three such case studies will be distributed to the different breakout rooms, and groups will take notes on their outcomes in a Google Doc shared with the organizers.

    Suppose that you are developing algorithms that can be used by a job-related social network such as LinkedIn to help recruiters determine who to target for job opportunities.  Consider the following questions in your discussion groups:

    1. Who would the recruiters like to be able to reach with job opportunities?  How can they be identified?
    2. What would it mean to allow recruiters to focus on equality of access in their outreach?  How can they be helped to do this?
    3. How could equality of access be formally defined in this case?
    4. What interventions is it possible for recruiters or the social network itself to do in order to increase equality of access?
    5. Are there other aspects of fairness in networks you think should be considered in this job-related network setting?

**15 min break.**

**Follow-up discussion / report back (10 mins)**
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

Armed with this mathematical framework, we will dive into a presentation of research on fairness in networks. We will start with a discussion of \emph{access} as the quantity that needs to be equitably distributed. Access in a network has typically been measured as some utility function of the probability of receiving information via a flow mechanism such as above. We will discuss the different utility functions that have been proposed in the literature. 

**Equity** Following this, we will review the axiomatic frameworks used to decide what it means for access to be equitable. Different works have proposed different principled arguments for deriving different measures of equity, such as preventing rich from getting richer, or ensuring that the least advantaged gain access (a Rawlsian maximin argument for example). We will briefly discuss concepts from welfare theory that are used in some works. The papers that we will cover here include those by 
\cite{tsang}, \cite{fish} and \cite{rahmattalabi}

These papers also represent two different frames for thinking about equity: a more ``individually focused'' version exemplified by \cite{fish} and one focused on equity for groups  illustrated by \cite{tsang,rahmattalabi}. We will highlight the tensions between these perspectives. 

**Dynamics**. Measures of equitable access can also be used to shed light on inequities in existing networks as well as be used to monitor how social phenomenon (through biases in attachment or recommendations) might increase bias in networks. We will introduce the audience to research that seeks to explore this in the context of gender discrimination \citep{stoica18} by suggesting mechanisms that lead to increased inequity, as well as in more general contexts with majority and minority groups \citep{augustin21}. This part of the tutorial will connect back with the work described above on the CS view of social capital: indeed, the work described here can be viewed as attempting to mathematically model empirically observed patterns of bias and thus provide a framework for interventions. 



**Interventions**. If we recognize that patterns of inequity manifest in a social network and that there are ways to measure it, how might we rectify this with interventions? In the world of influence maximization, interventions correspond to \emph{seeding} a network with carefully chosen nodes to improve access. We will review algorithms in the works above to intervene to optimize for fair access. The underlying algorithmic questions turn out to be much harder in general, not always admitting close-to-optimal solutions via submodular maximization except in special cases \citep{fish,tsang,rahmattalabi,ali2019fairness,10.1145/3366424.3383555}. We will also review work \citep{stoica20} that seeks to design models for network formation that admit more efficient interventions that are both effective and fair under appropriate definitions of equity. 


## Future Directions (20 mins)
We will close with a group discussion of suggested future directions for exploration of this field. As prompts, we will encourage the participants to reflect on their interactive activity and how the questions they posed there are addressed (or not) by current research efforts.
