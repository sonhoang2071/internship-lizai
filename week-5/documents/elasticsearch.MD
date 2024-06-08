# Elasticsearch

# 1. Overview

## 1.1 What is Elasticsearch

Elasticsearch is a tool based on Lucene software. It provides a fully-tooled, distributed search engine with an HTTP web interface that supports JSON data. Elasticsearch is developed in Java and released as open source under the Apache license.

In addition, ES is also considered a document oriented database. Its task is to store and retrieve documents. In ES, all documents are displayed in JSON format. It is built on Lucene - information search and retrieval software with over 15 years of experience in full text indexing and searching.

When mentioning Elasticsearch, we can remember the following basic characteristics:

- JSON based data: the system uses a noSQL database to store and query data, focusing on optimizing search performance. This ensures that Elasticsearch can provide accurate search results in near real-time, even on large data sets.
- RESTful APIs: Elasticsearch also provides a RESTful API interface, allowing other applications and services to interact with it easily. This makes integrating Elasticsearch into existing applications very flexible and convenient.
- Multi data resources: Data can come from many different sources. It could be Logs from the application, System Metrics or any data source with any type of data coming from any different application.
- Elasticsearch is designed for search purposes, so for tasks other than search such as CRUD, it is less elastic than other databases such as MongoDB, MySQL... In Elasticsearch there is no concept of database transaction, meaning it will not ensure data integrity during Insert, Update, Delete operations. Therefore, people rarely use Elasticsearch as the main database, but often combine it. it with another database.

## 1.2 Architecture

<aside>
💡 The basic architecture of Elasticsearch consists of nodes, which are the basic building blocks of a cluster.

</aside>

A node is a single instance of Elasticsearch that stores data and participates in the cluster's search and indexing capabilities. Nodes can be installed on a single machine or multiple machines, depending on the size and complexity of the data being indexed.

The nodes in Elasticsearch can be classified into two types: data nodes and master-eligible nodes.

- Data Nodes: These nodes store data and perform data-related operations such as indexing, searching, and aggregations. Data nodes hold the primary and replica shards of an index.
- Master-Eligible Nodes: These nodes perform cluster management tasks such as creating or deleting indices, assigning shards to nodes, and monitoring the health of the cluster. Master-eligible nodes also participate in the election of a new master node in the event of a failure.

Each node in Elasticsearch is assigned a unique name and can communicate with other nodes in the cluster over a network. Elasticsearch uses a discovery mechanism to find and join other nodes in the cluster. There are several discovery mechanisms available, such as unicast discovery, multicast discovery, and cloud discovery.
A cluster in Elasticsearch is a group of one or more nodes working together to store and manage data. When multiple nodes are connected and working together in a cluster, Elasticsearch automatically distributes data and load balances queries across all the nodes in the cluster.
Sharding is the process of breaking down a large index into smaller parts called shards, which can be distributed across multiple nodes in a cluster. Each shard is a self-contained index that can be stored and managed independently of other shards. By breaking an index into shards and distributing them across multiple nodes, Elasticsearch can handle large amounts of data and scale horizontally.

[https://media.licdn.com/dms/image/D5612AQFPKS1QZu4xGA/article-inline_image-shrink_1500_2232/0/1678949385570?e=1723075200&v=beta&t=lNpqrcKLZmtvXGnQBddevOKS50oiHVxXk7zEE04rJ0Q](https://media.licdn.com/dms/image/D5612AQFPKS1QZu4xGA/article-inline_image-shrink_1500_2232/0/1678949385570?e=1723075200&v=beta&t=lNpqrcKLZmtvXGnQBddevOKS50oiHVxXk7zEE04rJ0Q)

Elasticsearch can automatically balance the data across nodes in the cluster using the shard allocation feature. Each index is divided into multiple shards, and Elasticsearch can automatically distribute these shards across multiple nodes to ensure data availability and scalability.

[https://media.licdn.com/dms/image/D5612AQGyd8_WiHvGLQ/article-inline_image-shrink_1500_2232/0/1678949832452?e=1723075200&v=beta&t=0ygRTU8B-iqIcg4Cn8FBZlwAqLHGYPdye8aU2ZhjRQ8](https://media.licdn.com/dms/image/D5612AQGyd8_WiHvGLQ/article-inline_image-shrink_1500_2232/0/1678949832452?e=1723075200&v=beta&t=0ygRTU8B-iqIcg4Cn8FBZlwAqLHGYPdye8aU2ZhjRQ8)

# 2. Installtion

- Run Elasticsearch using a [Linux, MacOS, or Windows install package](https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html#elasticsearch-install-packages).
- Run Elasticsearch in a [Docker container](https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html#elasticsearch-docker-images).
- Set up and manage Elasticsearch, Kibana, Elastic Agent, and the rest of the Elastic Stack on Kubernetes with [Elastic Cloud on Kubernetes](https://www.elastic.co/guide/en/cloud-on-k8s/current).

# 3. Elasticsearch components

[https://lh7-us.googleusercontent.com/qW6sO-mx56peA1BAfeL9oolYY9nTOfvAF8xuuLWeoOsCJ3Y1F2d-lfOwjvjGU_ZYiLIl5Uwi7NUCx9FSc_STneZktCNeBzwFLW22RW0F1qbY3SSs3JgMsPqBe8_V-H4Oqzs4MvEG51oqyOcdfUdN-pk](https://lh7-us.googleusercontent.com/qW6sO-mx56peA1BAfeL9oolYY9nTOfvAF8xuuLWeoOsCJ3Y1F2d-lfOwjvjGU_ZYiLIl5Uwi7NUCx9FSc_STneZktCNeBzwFLW22RW0F1qbY3SSs3JgMsPqBe8_V-H4Oqzs4MvEG51oqyOcdfUdN-pk)

## 3.1 **Node**

- Is the operational center of Elasticsearch. Is where data is stored, participating in indexing the cluster as well as performing search operations.
- Each node is identified by a unique name.

## 3.2 **Cluster**

- A set of nodes that work together, sharing the same cluster.name attribute. That's why the Cluster will be identified by a 'unique name'. Identifying clusters with the same name will cause errors for the nodes, so when setting up you need to pay close attention to this point.
- Each cluster has a main node (master), which is automatically selected and can be replaced if a problem occurs. A cluster can consist of one or more nodes. Nodes can operate on the same server. However, in reality, a cluster will consist of many nodes operating on different servers to ensure that if one server has a problem, the other server (another node) can function fully compared to when there are two servers. Nodes can find each other to operate on the same cluster via unicast protocol.
- The main function of the Cluster is to decide which shards are allocated to which nodes and when to move the Clusters to rebalance the Cluster.

## 3.3 **Index**

- Elasticsearch uses a structure called an [inverted index](https://www.geeksforgeeks.org/inverted-index/). It is designed to allow full-text search. Its method is quite simple, the documents are separated into each meaningful word and then connected to see which text it belongs to. Each type of search will give a specific result.

## 3.4 **Shard**

- Shard is an object of Lucene. An Index can be divided into many shards.
- Each node consists of many Shards. That's why Shard is the smallest object, operating at the lowest level, playing the role of data storage.
- We almost never work directly with Shards.

Elasticsearch already supports all communication as well as automatically changes Shards when necessary.

There are 2 types of Shard: Primary Shard and Replica Shard.

- Primary Shard: Primary Shard is where data is stored and indexed. After typing, the data will be transported to the Replica Shards. Elasticsearch's default is that each index will have 5 Primary shards and each Primary shard will come with a Replica Shard.
- Replica Shard: Replica Shard is as its name suggests, it is the place to store cloned data of the Primary Shard. Replica Shard has the role of ensuring data integrity when problems occur with Primary Shard. In addition, Replica Shards can help increase search speed because we can set up more Replica Shards than Elasticsearch's default.

## 3.5 **Document**

Document is a JSON object with some data. This is the basic information unit in ES. Basically, this is the smallest unit for storing data in Elasticsearch.

# 4. How does Elasticsearch work?

## 4.1  **How Elasticsearch organizes data storage**

<aside>
💡 The logically organized data storage structure is similar to the RDMS relational database system with the following components:

</aside>

| RDMS | Elasticsearch |
| --- | --- |
| DB | Indexes |
| Tables | Patterns/Types |
| Row | Documents |
| Columns | Fields |

## 4.2  How Elasticsearch indexing

### 4.2.1 Index Management

- Create Index:

```bash
# Tạo index books
PUT "localhost:9200/books" -H 'Content-Type: application/json' -d'
{
  "mappings": {
    "properties": {
      "title": { "type": "text" },
      "author": { "type": "text" },
      "published_year": { "type": "integer" },
      "genre": { "type": "text" }
    }
  }
}
```

- Delete Index:

```bash
DELETE "localhost:9200/books"
```

### 4.2.2 Mapping

- Push data to books index

```bash
POST "localhost:9200/books/_doc/1"
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "published_year": 1925,
  "genre": "Fiction"
}
```

Elasticsearch then uses a mechanism called "Mappers" to map data in the document to relevant fields in the index. There are two types of mapping:

- Dynamic Mapping: Elasticsearch can automatically detect the data type of fields and create mappings for them. This is useful for quickly indexing new data, but it's important to be cautious as it may not always map fields correctly.
- Static Mapping: This involves explicitly defining mappings before indexing any documents. This gives you more control over data types and settings for each field.

## 4.3  How Elasticsearch manupulate data

### 4.3.1 **CRUD Operations**

- Create

```bash
POST "localhost:9200/books/_doc/1" 
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "published_year": 1925,
  "genre": "Fiction"
}
'
```

- Read

```bash
GET "localhost:9200/books/_doc/1"
```

- Update

```bash
POST "localhost:9200/books/_doc/1/_update" 
{
  "doc": {
    "published_year": 1926
  }
}
```

- Delete

```bash
DELETE "localhost:9200/books/_doc/1"
```

- Bulk API

Bulk API allows multiple operations to be performed at the same time, helping to increase performance when working with large amounts of data.

```bash
POST "localhost:9200/_bulk" 
{ "index" : { "_index" : "books", "_id" : "2" } }
{ "title" : "To Kill a Mockingbird", "author" : "Harper Lee", "published_year" : 1960, "genre" : "Fiction" }
{ "index" : { "_index" : "books", "_id" : "3" } }
{ "title" : "1984", "author" : "George Orwell", "published_year" : 1949, "genre" : "Dystopian" }
'

```

### 4.3.2 **Query DSL**

<aside>
💡 Query DSL (Domain Specific Language) is Elasticsearch's special query language, used to build complex search queries.

</aside>

- Match Query**:**

```bash
GET "localhost:9200/books/_search" 
{
  "query": {
    "match": {
      "genre": "Fiction"
    }
  }
}
```

- Bool Query

```bash
GET "localhost:9200/books/_search" 
{
  "query": {
    "bool": {
      "must": [
        { "match": { "genre": "Fiction" } }
      ]
    }
  }
}
```

- Filter Query

```bash
curl -X GET "localhost:9200/books/_search" -H 'Content-Type: application/json' -d'
{
  "query": {
    "bool": {
      "filter": {
        "term": {
          "genre": "Fiction"
        }
      }
    }
  }
}
'

```

- Range Query

```bash
GET "localhost:9200/books/_search"
{
  "query": {
    "bool": {
      "must": [
        { "match": { "genre": "Fiction" } }
      ],
      "filter": [
        { "range": { "published_year": { "gt": 1950 } } }
      ]
    }
  }
}
'

```

### 4.4.3 **Aggregations**

Aggregations in Elasticsearch is a powerful tool for calculating statistics and analyzing data. There are many types of aggregations, including:

- Metric Aggregations: Calculate statistics like sum, average, min, max, etc.
- Bucket Aggregations: Divide data into buckets based on a specific condition, like value range or terminology.
- Pipeline Aggregations: Process the results of one or more aggregations.

**Metric Aggregations**

Calculate the average year of publication of books:

```bash
GET "localhost:9200/books/_search" 
{
  "size": 0,
  "aggs": {
    "avg_published_year": {
      "avg": {
        "field": "published_year"
      }
    }
  }
}
'

```

**Bucket Aggregations**

Group books by genre (genre):

```bash
GET "localhost:9200/books/_search" 
{
  "size": 0,
  "aggs": {
    "genres": {
      "terms": {
        "field": "genre.keyword"
      }
    }
  }
}
'

```

**Pipeline Aggregations**

Calculate the average of the year of publication for each genre group:

```bash
GET "localhost:9200/books/_search" 
{
  "size": 0,
  "aggs": {
    "genres": {
      "terms": {
        "field": "genre.keyword"
      },
      "aggs": {
        "avg_published_year": {
          "avg": {
            "field": "published_year"
          }
        }
      }
    }
  }
}
```

## 4.4  EQL - SQL

### 4.4.1 EQL

<aside>
💡 Event Query Language (EQL) is a query language for event-based time series data, such as logs, metrics, and traces.

</aside>

- **Match any event category**

```bash
any where network.protocol == "http"
```

- **Conditions**
    - **Comparison operator**

    ```bash
    <   <=   ==   :   !=   >=   >
    ```

    - **Pattern comparison keywords**

    ```bash
    my_field like  "VALUE*"         // case-sensitive wildcard matching
    my_field like~ "value*"         // case-insensitive wildcard matching
    
    my_field regex  "VALUE[^Z].?"   // case-sensitive regex matching
    my_field regex~ "value[^z].?"   // case-insensitive regex matching
    ```

- **Logical operators**

```bash
and  or  not
```

- **Lookup operators**

```bash
my_field in ("Value-1", "VALUE2", "VAL3")                 // case-sensitive
my_field in~ ("value-1", "value2", "val3")                // case-insensitive

my_field not in ("Value-1", "VALUE2", "VAL3")             // case-sensitive
my_field not in~ ("value-1", "value2", "val3")            // case-insensitive

my_field : ("value-1", "value2", "val3")                  // case-insensitive

my_field like  ("Value-*", "VALUE2", "VAL?")              // case-sensitive
my_field like~ ("value-*", "value2", "val?")              // case-insensitive

my_field regex  ("[vV]alue-[0-9]", "VALUE[^2].?", "VAL3") // case-sensitive
my_field regex~  ("value-[0-9]", "value[^2].?", "val3")   // case-insensitive
```

- **Math operators**

```bash
+  -  *  /  %
```

### 4.4.2 SQL

X-Pack includes a SQL feature to execute SQL queries against Elasticsearch indices and return results in tabular format.

The following chapters aim to cover everything from usage, to syntax and drivers. Experienced users or those in a hurry might want to jump directly to the list of SQL [commands](https://www.elastic.co/guide/en/elasticsearch/reference/8.13/sql-commands.html) and [functions](https://www.elastic.co/guide/en/elasticsearch/reference/8.13/sql-functions.html).

- you can execute SQL using the [SQL search API](https://www.elastic.co/guide/en/elasticsearch/reference/8.13/sql-search-api.html):

```bash
POST /_sql?format=txt
{
  "query": "SELECT * FROM library WHERE release_date < '2000-01-01'"
}
```

- You can also use the [*SQL CLI*](https://www.elastic.co/guide/en/elasticsearch/reference/8.13/sql-cli.html). There is a script to start it shipped in x-pack’s bin directory:

```bash
$ ./bin/elasticsearch-sql-cli

sql> SELECT * FROM library WHERE release_date < '2000-01-01';
```

## 4.5 Scripting

With scripting, you can evaluate custom expressions in Elasticsearch. For example, you can use a script to return a computed value as a field or evaluate a custom score for a query.

The default scripting language is [Painless](https://www.elastic.co/guide/en/elasticsearch/reference/8.13/modules-scripting-painless.html). Additional **lang** plugins are available to run scripts written in other languages. You can specify the language of the script anywhere that scripts run.

**Available scripting languages**

Painless is purpose-built for Elasticsearch, can be used for any purpose in the scripting APIs, and provides the most flexibility. The other languages are less flexible, but can be useful for specific purposes.

[Painless](https://www.elastic.co/guide/en/elasticsearch/reference/8.13/modules-scripting-painless.html) is the default scripting language for Elasticsearch. It is secure, performant, and provides a natural syntax for anyone with a little coding experience.

A Painless script is structured as one or more statements and optionally has one or more user-defined functions at the beginning. A script must always have at least one statement.

The [Painless execute API](https://www.elastic.co/guide/en/elasticsearch/painless/8.13/painless-execute-api.html) provides the ability to test a script with simple user-defined parameters and receive a result. Let’s start with a complete script and review its constituent parts.

First, index a document with a single field so that we have some data to work with:

```
PUT my-index-000001/_doc/1
{
  "my_field": 5
}
```

We can then construct a script that operates on that field and run evaluate the script as part of a query. The following query uses the [script_fields](https://www.elastic.co/guide/en/elasticsearch/reference/8.13/search-fields.html#script-fields) parameter of the search API to retrieve a script valuation. There’s a lot happening here, but we’ll break it down the components to understand them individually. For now, you only need to understand that this script takes **my_field** and operates on it.

```bash
GET my-index-000001/_search
{
  "script_fields": {
    "my_doubled_field": {
      "script": {
        "source": "doc['my_field'].value * params['multiplier']",
        "params": {
          "multiplier": 2
        }
      }
    }
  }
}
```

# 5. Integrated software

## 5.1 Kibana

Kibana is an analytics platform that displays data from Elasticsearch in an intuitive, easy-to-use way. Kibana is also a free, open source tool for anyone to use. Kibana provides user management features such as column charts, line charts, pie charts, heat charts and many other chart types.

- **Visualization**: Create charts, graphs, maps, and other types of visualizations from data.
- **Dashboards**: Combine multiple visualizations into one dashboard to create an overview that's easy to follow.
- **Discover**: Explore and search data in real time.
- **Canvas**: Create dynamic reports and present data interactively.
- **Machine Learning**: Analyze data to detect anomalies and trends.

<aside>
💡 Kibana is often used in conjunction with Elasticsearch for log analysis, system performance monitoring, and big data visualization.

</aside>

## 5.2 Beat

Beats is a set of lightweight data shippers (data senders) installed on the server to collect and send data to Logstash or Elasticsearch. Some popular types of Beats include:

- **Filebeat**: Collect and forward log files.
- **Metricbeat**: Collect system and service metrics such as CPU, RAM, and network parameters.
- **Packetbeat**: Collect and analyze network traffic.
- **Winlogbeat**: Collect Windows Event Logs.
- **Heartbeat**: Check availability of services and websites.

<aside>
💡 Beats makes it easy to collect and send data from various sources into Elasticsearch for analysis and monitoring.

</aside>

## 5.3 Logtash

Logstash is a powerful and flexible data processing engine that allows data to be collected, transformed, and sent from various sources into Elasticsearch or other storage systems. Logstash's main functions include:

- **Ingest**: Collect data from various sources such as log files, systems, databases, and networks.
- **Filter**: Process and transform data by applying filters, such as gsub, mutate, and grok.
- **Output**: Send processed data to Elasticsearch or other systems such as Kafka, Amazon S3, or stdout.

<aside>
💡 Logstash is commonly used for log processing, data transformation, and integrating multiple data sources into a single pipeline before storing or analyzing.

</aside>