# Docker Swarm

# 1. Overview

<aside>
💡 Docker Swarm is one of the most popular container orchestration engines. It is not only used by professional engineers but also by people is their learning phase of how operations work. What makes Docker Swarm so popular is the fact that is very lightweight and very simple to understand – you don’t even have to learn a new CLI for Docker Swarm, we can use it with Docker CLI.

In this article, we will learn about Docker Swarm, its features, and use cases and will also go through a tutorial to create highly scalable clusters in Docker Swarm.

</aside>

## 1.1 **What is Docker Swarm?**

[**Docker Swarm**](https://www.geeksforgeeks.org/introduction-to-docker-swarm-mode/) is a container orchestration engine that was included by Docker as a part of its container runtime. Docker Swarm was included in the Docker container runtime in June of 2016.

Docker Swarm is also included in the Mirantis Container Runtime (formerly called the Docker Enterprise Engine) which is also referred to as MCR, which takes a Docker Engine and adds additional features and capabilities including security hardening to make it enterprise-ready.

## 1.2 Advantages

Let us take an example to understand the need of Docker Swarm. Let us say you have an application that is divided into 100 containers, now you will need to manage and control multiple containers at a time as a single service. This is called Orchestration – managing and controlling multiple containers as a single service. And this is what we use Docker Swarm for.

We use Docker Swarm for the following tasks:

1. Health check on every container
2. Ensure all containers are up on every system
3. Scaling the containers up or down
4. Adding updates/changes to all the containers
5. Deploying a fixed set of containers
6. Performing rolling update of the containers
7. Load Balancing of the containers

## 1.3 Features

We have many Container Orchestration tools in the market like [**Kubernetes**](https://www.geeksforgeeks.org/introduction-to-kubernetes-k8s/), Apache Mesos etc. Kubernetes is even more popular Orchestration tool, Then why should Docker? Here are a few reasons to use [**Docker**](https://www.geeksforgeeks.org/containerization-using-docker/) and some features of Docker:

**1.** Docker Swarm schedules the containers, sets up Network Predictions, Monitors for Container health and also restarts any container that have died or are deemed to be unhealthy. If an entire node goes down Docker Swarm will reschedule those workloads on a different node.

**2.** Docker Swarm becomes even more useful when you want to orchestrate your containers and don’t want to download and install a separate software package since it is already installed with Docker. All you need to do is turn the Docker Swarm on.

**3.** Docker Swarm works with both Linux and Windows worker nodes.

**4.** Swarm can be extended with Networking Plugins, Storage Plugins, Logging Plugins etc. What does it actually solves is it lets you declare your state instead of having to do everything manually and all your resources, your services, labeling or constraints can be declared in a *‘yaml’* file.

**5.** Swarm also handles provisioning and manages where containers get deployed so if you have a cluster of several nodes it will try to balance out your workloads across multiple nodes within your cluster. That is great for high availability and scaling. If you have a peak in traffic you need to scale up your web server, you can do that in swarm mode. I can also move containers from one node to another so if one node runs out of resources or the whole node goes down that is when it will act upon that.

**6.** Docker Swarm also load balances traffic across multiple containers.

**7.** Swarm keeps track of the health of the containers. It also allows us to expose services with an ingress solution.

# 2. **Docker Swarm Architecture**

1. **Manager node:** Carries out and oversees cluster-level duties.
2. **Worker node:** Receives and completes the tasks set by the manager node.

![https://media.geeksforgeeks.org/wp-content/uploads/20230509134621/docker-swarm-mode.webp](https://media.geeksforgeeks.org/wp-content/uploads/20230509134621/docker-swarm-mode.webp)

A single manager node can be created but the worker node can not be created without a manager node. The ideal number for the count of the manager node is seven. Increasing the number of the manager node does not mean that the [**scalability will increase**](https://www.geeksforgeeks.org/overview-of-scaling-vertical-and-horizontal-scaling/).

# Features of Docker Swarm

1. **Cluster management:-** To create Swarm you can use the [**Docker engine CLI**](https://www.geeksforgeeks.org/tips-to-manage-docker-containers-using-cli/) where you can deploy the applications. Additional orchestration software is not required to manage a swarm.
2. **Multi-host networking:-** Swarm can contain multiple overlay networks so while deploying the service you can specify the network on which you want to deploy your service. The swarm manager automatically assigns addresses to the containers on the overlay network when it initializes or updates the application.
3. **Load balancing:-** While deploying any service on a particular port the swarm automatically balances the load of these ports.
4. **Scaling:-** When you scale up or down, the swarm manager automatically adapts by adding or removing tasks to maintain the desired state.

# 3. CommandLine

1. **Initializing a Docker Swarm:**
    - **docker swarm init**: Initialize a Docker Swarm on the current node and make it a manager.
2. **Joining a Docker Swarm:**
    - **docker swarm join**: Join a Docker Swarm as a worker or manager.
3. **Viewing information about Docker Swarm:**
    - **docker info**: Display information about the current Docker Swarm, including the number of nodes, running services, and other Docker installations.
4. **Deploying and managing services:**
    - **docker service create**: Create a new service on Docker Swarm.
    - **docker service ls**: List all running services on Docker Swarm.
    - **docker service inspect <service_name>**: View detailed information about a specific service.
    - **docker service update**: Update the configuration of a service.
    - **docker service scale**: Change the number of replicas of a service.
    - **docker service rm**: Remove a service from Docker Swarm.
5. **Managing nodes in Docker Swarm:**
    - **docker node ls**: List all nodes in Docker Swarm.
    - **docker node inspect <node_name>**: View detailed information about a specific node.
    - **docker node update**: Update the configuration of a node.
    - **docker node promote**: Promote a node from a worker role to a manager.
    - **docker node demote**: Demote a node from a manager role to a worker.
    - **docker node rm**: Remove a node from Docker Swarm.
6. **Viewing service logs:**
    - **docker service logs <service_name>**: View logs of a service.
7. **Managing secrets and configs:**
    - **docker secret**: Manage secrets in Docker Swarm.
    - **docker config**: Manage configs in Docker Swarm.
8. **Managing volumes:**
    - **docker volume ls**: List volumes.
    - **docker volume inspect**: View detailed information about a volume.
9. **Deploying application stacks:**

-   **docker stack deploy**: Deploy an application stack to Docker Swarm.
